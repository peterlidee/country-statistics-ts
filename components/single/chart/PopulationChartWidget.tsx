// https://www.chartjs.org/docs/latest/getting-started/integration.html
import { 
  Chart as ChartJS,
  CategoryScale, 
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  Tooltip,
  Legend,
);

import { Chart } from 'react-chartjs-2';
import colors from '../../../config/colors';
import PropTypes from 'prop-types';
import formatPopulationLabel from '../../../lib/single/formatPopulationLabel';

function PopulationChartWidget(props){

  const chartData = {
    labels: props.years,
    datasets: [
      {
        type: 'bar',
        label: 'Total females',
        data: props.femaleTotal,
        backgroundColor: "rgba(84, 139, 244, 0.5)",
        hoverBackgroundColor: "rgba(84, 139, 244, 0.5)",
        barPercentage: 1,
      },
      {
        type: 'bar',
        label: 'Total males',
        data: props.maleTotal,
        backgroundColor: colors.blue,
        hoverBackgroundColor: colors.blue,
        barPercentage: 1,
      },
      {
        type: 'line',
        label: 'Total population',
        data: props.combinedTotal,
        backgroundColor: "#52cc7c",
        hoverBackgroundColor: "#52cc7c",
        borderColor: "#52cc7c",
        hoverBorderColor: "#52cc7c",
        borderWidth: 4,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 4,
      },
    ]
  }

  const chartOptions = {
    responsive: true, // default
    // turn off aspectration, it gets too small on small sizes!!
    maintainAspectRatio: false,
    // format the labels on the x-axes
    scales: {
      y: {
        ticks: {
          callback: function(value, index, values) {
            return formatPopulationLabel(value);
          }
        }
      }
    },
    // show the legend on the bottom
    plugins: {
      legend: {
        display: true, // default
        position: "bottom",
        labels: {
          padding: 20,
        },
      },
    },
    // show all labels for index in tooltip (show female, male and total)
    interaction: {
      intersect: false, // show when hovering on chart, not when hovering line or bar
      mode: 'index',
    },
  }

  const startYear = props.years[0] || "-";
  const endYear = props.years[props.years.length - 1] || "-";

  return(
    <>
      <h4 className="chart__title">{`Population evolution ${startYear}-${endYear}`}</h4>
      <div className='chart-container'>
        <Chart type='bar' data={chartData} options={chartOptions} />
      </div>
    </>
  )
}

PopulationChartWidget.propTypes = {
  years: PropTypes.array.isRequired,
  femaleTotal: PropTypes.array.isRequired,
  maleTotal: PropTypes.array.isRequired,
  combinedTotal: PropTypes.array.isRequired,
}
export default PopulationChartWidget;