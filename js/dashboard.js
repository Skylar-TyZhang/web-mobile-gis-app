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
              label: 'Condition Description index',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              // borderColor: window.chartColors.red,
              borderWidth: 1,
              data: conditionData,
            },

          ],
        },
        options: {
          onClick: function (event, activeElements) {
            if (activeElements.length > 0) {
              var clickedElementIndex = activeElements[0]._index;
              var clickedElementValue = this.data.datasets[0].data[clickedElementIndex];
              console.log('You clicked on bar number ' + clickedElementIndex + ' with a value of ' + clickedElementValue);

            }
          },

          responsive: true,
          legend: {
            display: true,
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

      assets.features.forEach((feature) => {
        for (let i = 0; i < pielabel.length; i++) {
          const label = pielabel[i];
          if (feature.properties.condition_description == label) {
            conditionCount[label]++;
          };
        }

      })
      //console.log(conditionCount);
      //console.log(Object.values(conditionCount));
      let pieData = Object.values(conditionCount);


      /**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
      const pieConfig = {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: pieData,
              /**
               * These colors come from Tailwind CSS palette
               * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
               */
              // the color of pie chart was adapted from https://www.chartjs.org/docs/latest/charts/bar.html
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],

            },
          ],
          labels: pielabel,
        },
        options: {
          responsive: true,
          cutoutPercentage: 70,

          legend: {
            display: false,
          },
        },
      }

      // change this to the id of your chart element in HMTL
      const pieCtx = document.getElementById('pie')
      window.myPie = new Chart(pieCtx, pieConfig)



    });


}

// set up onclick event handelers
//https://www.chartjs.org/docs/latest/configuration/legend.html

