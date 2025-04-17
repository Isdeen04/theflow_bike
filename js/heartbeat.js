<!--
function sendHeartbeat() {
  fetch('catalogue__heartbeat', {
    method: 'POST',
    credentials: 'include' // Invia i cookie di sessione con la richiesta
  })
  .then(response => response.json())
  .then(data => {
    /*if (data.status === 'success') {
      console.log('Heartbeat inviato con successo');
    } else {
      console.error('Errore nell\'heartbeat:', data.message);
    }*/
  })
  .catch(error => {
    //console.error('Errore nella richiesta di heartbeat:', error);
  });
}

// Invia un heartbeat ogni 5 minuti
setInterval(sendHeartbeat, 300000);
//-->