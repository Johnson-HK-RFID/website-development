$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskSnapshot = Join-Path $taskRoot 'references\website-requirements\aa55356c7615'
$taskManifest = Get-Content -LiteralPath (Join-Path $taskSnapshot 'source-manifest.json') -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($taskFile in $taskManifest.files) {
    $taskPath = Join-Path (Join-Path $taskSnapshot 'source') $taskFile.path
    $taskHash = (Get-FileHash -LiteralPath $taskPath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($taskHash -ne $taskFile.sha256) { throw "Protected source changed: $($taskFile.path)" }
}
Write-Output "PASS: all $($taskManifest.files.Count) protected source files are unchanged."
