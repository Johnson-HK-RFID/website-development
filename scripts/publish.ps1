$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
. (Join-Path $PSScriptRoot 'tool-env.ps1')
Push-Location $taskRoot
try {
    $taskRemote = git remote get-url origin
    if ($LASTEXITCODE -ne 0 -or $taskRemote -ne 'https://github.com/Johnson-HK-RFID/website-development.git') { throw 'Unexpected delivery remote. Inspect before publishing.' }
    $taskBranch = git branch --show-current
    if ($taskBranch -ne 'main') { throw 'The delivery branch must be main.' }
    $taskChanges = git status --porcelain
    if ($taskChanges) { throw 'Review and commit outstanding changes before publishing.' }
    & (Join-Path $PSScriptRoot 'verify-sources.ps1')
    gh auth status
    if ($LASTEXITCODE -ne 0) {
        gh auth login --hostname github.com --git-protocol https --web --skip-ssh-key
        if ($LASTEXITCODE -ne 0) { throw 'GitHub authentication was not completed.' }
    }
    gh auth setup-git
    if ($LASTEXITCODE -ne 0) { throw 'Git credential setup failed.' }
    git push -u origin main
    if ($LASTEXITCODE -ne 0) { throw 'Push failed. Remote history was not overwritten; inspect the reported error.' }
    $taskLocal = git rev-parse HEAD
    $taskRemoteHead = git ls-remote origin refs/heads/main
    if ($LASTEXITCODE -ne 0 -or -not $taskRemoteHead.StartsWith($taskLocal)) { throw 'Remote verification failed.' }
    Write-Output "Verified: https://github.com/Johnson-HK-RFID/website-development/commit/$taskLocal"
} finally { Pop-Location }
