export default class Alert {
  constructor() {
    this.alerts = [];
  }

  loadAlerts() {
      fetch('js/alerts.json')
        .then(response => response.json())
        .then(alertsData => {
          if (Array.isArray(alertsData)) {
            this.alerts = alertsData;
            this.createAlertSection();
          }
        })
        .catch(error => {
          console.error('Failed to load alerts:', error);
        });
    }
    

  createAlertSection() {
    const mainElement = document.querySelector('main');

    if (this.alerts.length > 0) {
      const alertSection = document.createElement('section');
      alertSection.classList.add('alert-list');

      this.alerts.forEach(alertData => {
        const alert = document.createElement('p');
        alert.textContent = alertData.message;
        alert.style.background = alertData.background;
        alert.style.color = alertData.color;

        alertSection.appendChild(alert);
      });

      mainElement.prepend(alertSection);
    }
  }
}