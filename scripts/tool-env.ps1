$taskWorkspace = Split-Path -Parent $PSScriptRoot
$taskToolsRoot = Join-Path $taskWorkspace '.tools'
$taskNode = Get-ChildItem -LiteralPath (Join-Path $taskToolsRoot 'node') -Recurse -Filter node.exe -File | Select-Object -First 1
$taskGit = Get-ChildItem -LiteralPath (Join-Path $taskToolsRoot 'git') -Recurse -Filter git.exe -File | Where-Object { $_.Directory.Name -eq 'cmd' } | Select-Object -First 1
$taskGh = Get-ChildItem -LiteralPath (Join-Path $taskToolsRoot 'gh') -Recurse -Filter gh.exe -File | Select-Object -First 1
if (-not $taskNode -or -not $taskGit -or -not $taskGh) { throw 'Run bootstrap-tools.ps1 first.' }
$env:PATH = "$($taskNode.DirectoryName);$($taskGit.DirectoryName);$($taskGh.DirectoryName);$env:PATH"
$env:npm_config_cache = Join-Path $taskToolsRoot 'npm-cache'
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path $taskToolsRoot 'playwright'
$env:NEXT_TELEMETRY_DISABLED = '1'

# Reuse the user's Windows proxy for tools that do not read system proxy settings.
$taskNetworkUri = [uri]'https://github.com'
$taskSystemProxy = [Net.WebRequest]::DefaultWebProxy
if (-not $env:HTTPS_PROXY -and -not $taskSystemProxy.IsBypassed($taskNetworkUri)) {
    $taskProxyUri = $taskSystemProxy.GetProxy($taskNetworkUri)
    $env:HTTPS_PROXY = $taskProxyUri.AbsoluteUri
    $env:HTTP_PROXY = $taskProxyUri.AbsoluteUri
    if (-not $env:NO_PROXY) { $env:NO_PROXY = 'localhost,127.0.0.1,::1' }
}
