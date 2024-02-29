import React, { useEffect, useState } from 'react';

import Alert from "react-bootstrap/Alert";

import AlertsService from '../../services/alertService';
import HTMLService from '../../services/htmlService';

const alertStyles = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
]

function AlertItem(props) {
    const [showAlert, setShowAlert] = useState(false);
    const { alert, alertClass } = props;

    useEffect(() => {
        setShowAlert(alert ? true : false)
    }, [alert])

    if (showAlert) {
        return (
            <Alert
                key={alert.id}
                variant={alertClass}
                show={showAlert}
                onClose={() => setShowAlert(false)}
                className="mb-0"
                dismissible
            >
                <p><strong>{alert.title.rendered}:</strong> {HTMLService.sanatizeHTML(alert.content.rendered)}</p>
            </Alert>
        )
    } else {
        return <></>
    }
}

function SiteAlert() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        async function getAlerts() {
            const alertList = await AlertsService.getAlerts();

            setAlerts(alertList);
        }

        getAlerts();
    }, []);

    return (
        <>
            {
                alerts ? 
                    alerts.map(alert => {
                        const className = HTMLService.sanatizeHTML(alert.excerpt.rendered);
                        const alertClass = alertStyles.includes(className.trim()) ? className : "danger"

                        return (
                            <AlertItem 
                                alert={alert}
                                alertClass={alertClass} 
                            />
                        )
                    })
                : <></>
            }
        </>
    )
}

export default SiteAlert;