'use strict';

async function loadBarChart() {
  let conditions = await getconditionDetails();
  let user_id = await getUserId();
  let xlabel = [];
  let conditionData = [];

  let dataURL = baseComputerAddress + `/api/geojson/userAssets/${user_id}`
  fetch(dataURL)
    .then(response => response.json())
    .then(data => {
      let assets = data[0];
      //console.log('fetch data for bar chart');

      assets.features.forEach((feature) => {
        xlabel.push(feature.properties.asset_name);

        for (let i = 0; i < conditions.length; i++) {
          if (feature.properties.condition_description = conditions[i]) {
            conditionData.push(i + 1);
          };
        };
      })
      //console.log(xlabel)
      //console.log(conditionData)
      /*
      * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
      */
      const barConfig = {
        type: 'bar',
        data: {
          labels: xlabel,
          datasets: [
            {
              label: 'Condition',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              // borderColor: window.chartColors.red,
              borderWidth: 1,
              data: conditionData,
            },

          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },

          responsive: true,
          legend: {
            display: false,
          },
        },
      }

      const barsCtx = document.getElementById('bars')
      window.myBar = new Chart(barsCtx, barConfig)



    });

}
// 
async function loadPieChart() {
  let conditions = await getconditionDetails();//console.log(conditions);
  let user_id = await getUserId();
  let pielabel = [];
  let conditionCount = {};

  let dataURL = baseComputerAddress + `/api/geojson/userAssets/${user_id}`
  fetch(dataURL)
    .then(response => response.json())
    .then(data => {
      let assets = data[0];
      // create labels for different condition
      for (let i = 0; i < conditions.length; i++) {
        // store the conditoin description in array
        pielabel.push(conditions[i].condition_description);
        conditionCount[conditions[i].condition_description] = 0
      };
      console.log(pielabel);
      console.log('set up count');
      console.log(conditionCount);

      assets.features.forEach((feature) => {
        for (let i = 0; i < pielabel.length; i++) {
          const label = pielabel[i];                    
          if (feature.properties.condition_description == label) {
            conditionCount[label]++;
          };
        }

      })
      console.log(conditionCount);
      console.log(Object.values(conditionCount));
      data = Object.values(conditionCount)


      /*
      * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
      */


    });


}