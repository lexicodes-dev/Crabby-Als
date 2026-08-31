const url = 'https://mgmt.crabbyals.com/graphql';
const query = `
        query GetPromoPopup {
            popups(first: 10) {
                nodes {
                    id
                    editPopup {
                        popupText
                        popupSwitch
                    }
                }
            }
        }
`;
fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) })
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)));
