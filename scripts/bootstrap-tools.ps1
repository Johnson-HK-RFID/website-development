$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskTools = Join-Path $taskRoot '.tools'
New-Item -ItemType Directory -Path $taskTools -Force | Out-Null

function Get-VerifiedArchive($url, $destination, $expectedHash) {
    if (-not (Test-Path -LiteralPath $destination)) {
        Invoke-WebRequest -UseBasicParsing -Uri $url -OutFile $destination
    }
    if ($expectedHash) {
        $actualHash = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash
        if ($actualHash -ne $expectedHash) { throw "Checksum mismatch: $destination" }
    }
}

if (-not (Test-Path -LiteralPath (Join-Path $taskTools 'node'))) {
    $releases = Invoke-RestMethod 'https://nodejs.org/dist/index.json'
    $release = @($releases | Where-Object { $_.lts -and $_.files -contains 'win-x64-zip' })[0]
    $name = "node-$($release.version)-win-x64.zip"
    $checksums = (Invoke-WebRequest -UseBasicParsing "https://nodejs.org/dist/$($release.version)/SHASUMS256.txt").Content
    $hashLine = @($checksums -split "`n" | Where-Object { $_.Trim().EndsWith("  $name") })[0]
    if (-not $hashLine) { throw 'Node archive checksum missing.' }
    $archive = Join-Path $taskTools $name
    Get-VerifiedArchive "https://nodejs.org/dist/$($release.version)/$name" $archive ($hashLine -split '\s+')[0]
    Expand-Archive -LiteralPath $archive -DestinationPath (Join-Path $taskTools 'node')
    Write-Output "Node installed: $($release.version)"
}

foreach ($tool in @(@{name='git';repo='git-for-windows/git';pattern='^MinGit-[\d.]+-64-bit\.zip$'},@{name='gh';repo='cli/cli';pattern='^gh_[\d.]+_windows_amd64\.zip$'})) {
    $target = Join-Path $taskTools $tool.name
    if (Test-Path -LiteralPath $target) { continue }
    $release = Invoke-RestMethod "https://api.github.com/repos/$($tool.repo)/releases/latest"
    $asset = @($release.assets | Where-Object { $_.name -match $tool.pattern })[0]
    if (-not $asset) { throw "Archive not found for $($tool.name)" }
    $expected = if ($asset.digest -like 'sha256:*') { $asset.digest.Substring(7) } else { $null }
    $archive = Join-Path $taskTools $asset.name
    Get-VerifiedArchive $asset.browser_download_url $archive $expected
    Expand-Archive -LiteralPath $archive -DestinationPath $target
    Write-Output "$($tool.name) installed: $($release.tag_name)"
}
