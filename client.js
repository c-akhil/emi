async function getEmiDetails() {
    let response = await fetch("http://localhost:4000/getEMIPaymentDetails?principal=" + document.getElementById('loanamount').value + "&roi=" + document.getElementById('annualinterestrate').value + "&timePeriod=" + document.getElementById('loanperiod').value);
    let data = await response.json();
    console.log(data);
    if (data && data.length > 0) {
        let tableTrs = '';
        data.forEach((item, index) => {
            tableTrs = tableTrs + `<tr>
            <td>${index + 1}</td>
            <td>${item.paymentAmount}</td>
            <td>${item.principalAmount}</td>
            <td>${item.intrestAmount}</td>
            <td>${item.outstanding}</td>
        </tr>`
        });
        document.getElementById('table').innerHTML = `<table class="pure-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>paymentAmount</th>
                            <th>principalAmount</th>
                            <th>intrestAmount</th>
                            <th>outstanding</th>
                        </tr>
                    </thead>
            
                    <tbody>
                       ${tableTrs}
                    </tbody>
                </table>`;
    } else alert((data.statusMessage))

}