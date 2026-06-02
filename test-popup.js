async function testQuery() {
    const url = 'https://mgmt.crabbyals.com/graphql';
    
    const query = `
        query {
            mediaItems(first: 5) {
                nodes {
                    databaseId
                    sourceUrl
                    mimeType
                }
            }
        }
    `;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    });
    
    const data = await response.json();
    console.log("Media Items:", JSON.stringify(data, null, 2));
}
testQuery();
