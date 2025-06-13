# Dette scriptet er ment som en midlertidig løsning, for å fjerne sensitiv informasjon fra Jira issues, slik at jeg overholder GDPR og DORA. 
# Det er ikke ment som en permanent løsning, og det er ikke sikkert at det vil fungere i fremtiden.
# Det er ment for å ha muligheten til å lagre tittel, og beskrivelse av issues, uten at det er sensitiv informasjon i dem.
# En permanent løsning vil være å lage en oppdateringsflyt ved hjelp av Azure functions, som henter data fra Jira API en gang i timen, og erstattet json filen i Azure Blob Storage med en ny fil.

$inputfile = "C:\temp\jira_export.json"

$outputfile = "C:\prosjekter\dashboard-it\public\data\jira_export_cleaned.json"

$json = Get-Content $inputfile -Raw | ConvertFrom-Json

$cleaned = $json.issues | ForEach-Object {
    [PSCustomObject]@{
        title = $_.fields.summary
        created = $_.fields.created
        key = $_.key
    }
}

$cleaned | ConvertTo-Json -Depth 3 | Out-File -Encoding UTF8 $outputfile

Write-Host "Cleaned data has been saved to $outputfile"
