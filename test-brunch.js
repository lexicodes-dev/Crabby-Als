async function testQuery() {
    const url = 'https://mgmt.crabbyals.com/graphql';
    
    const query = `
        query {
            allBrunchMenus(first: 1) {
                nodes {
                    databaseId
                    updateBrunchMenu {
                        brunchMenu {
                            node {
                                sourceUrl
                            }
                        }
                    }
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
    console.log(JSON.stringify(data, null, 2));
}
testQuery();
