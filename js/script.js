(function () {
  // ========== CONFIGURAZIONE INVIO EMAIL (WEB3FORMS PER SITI STATICI) ==========
  // Poiché il sito è statico e può essere ospitato gratis su GitHub Pages, Cloudflare Pages o Aruba,
  // la soluzione migliore e 100% gratuita per ricevere e-mail senza un server proprio è Web3Forms.
  var EMAIL_CONFIG = {
    // Scegli il provider: 
    // - 'web3forms': invia e-mail direttamente alla tua casella e-mail (impostato come predefinito)
    // - 'debug': simula solo l'invio stampando i dati in console senza spedire e-mail
    // - 'custom-backend': effettua una POST JSON verso una tua API / Serverless Function custom
    provider: 'web3forms', 
    
    // Inserisci qui la tua chiave di accesso pubblica Web3Forms.
    // Come ottenerla: vai su https://web3forms.com, inserisci la tua email (fabiot2801@gmail.com)
    // e riceverai la chiave all'istante nella tua casella di posta gratis e senza registrazioni.
    web3forms_key: '3e7755c9-825b-4a56-bd93-1a14d86e75c9',
    
    // URL per eventuale backend custom (usato solo se provider è 'custom-backend')
    endpoint: 'https://tuo-dominio.com/api/send-email'
  };

  // ========== MOBILE MENU ==========
  document.addEventListener('DOMContentLoaded', function () {

    var toggle = document.getElementById('mobile-menu-toggle');
    var menu   = document.getElementById('mobile-menu');
    var icon   = document.getElementById('mobile-menu-icon');

    if (toggle && menu && icon) {
      toggle.addEventListener('click', function () {
        menu.classList.toggle('open');
        icon.innerHTML = menu.classList.contains('open')
          ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
      });
    }

    // ========== SCROLL FADE-IN ANIMATIONS ==========
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) {
      observer.observe(el);
    });

    // ========== FAQ ACCORDION ==========
    document.addEventListener('click', function (e) {
      var toggleBtn = e.target.closest('.faq-toggle');
      if (toggleBtn) {
        var item   = toggleBtn.closest('.faq-item');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      }
    });

    // ========== GESTIONE INVIO MODULO DI ISCRIZIONE ==========
    document.addEventListener('submit', function (e) {
      if (e.target.id === 'join-form') {
        // Se il form non supera la validazione HTML5 nativa, si ferma
        if (!e.target.checkValidity()) {
          return;
        }
        
        e.preventDefault();
        
        var form = e.target;
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalBtnText = submitBtn.textContent;
        var msgElement = document.getElementById('join-msg');
        
        // Disabilita il pulsante ed imposta lo stato di caricamento
        submitBtn.disabled = true;
        submitBtn.textContent = 'Invio in corso...';
        
        // Raccoglie i dati compilati
        var formData = new FormData(form);
        var data = {};
        formData.forEach(function(value, key){
          data[key] = value;
        });
        
        if (EMAIL_CONFIG.provider === 'custom-backend') {
          // Invio POST JSON verso serverless function o backend custom (che userà Resend lato server)
          fetch(EMAIL_CONFIG.endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(function(res) {
            if (res.ok) {
              handleSuccess(form, submitBtn, originalBtnText, msgElement);
            } else {
              handleError(submitBtn, originalBtnText, 'Impossibile completare la richiesta. Il server ha risposto con un errore.', msgElement);
            }
          })
          .catch(function() {
            handleError(submitBtn, originalBtnText, 'Errore di connessione. Controlla la tua rete e riprova.', msgElement);
          });
        }
        else if (EMAIL_CONFIG.provider === 'web3forms') {
          // Invio sicuro tramite l'API di Web3Forms (ideale per form statici client-side)
          var payload = {
            access_key: EMAIL_CONFIG.web3forms_key,
            subject: 'Nuova Richiesta Iscrizione A.A.T. — ' + data['nome-cognome'],
            from_name: 'Associazione Astrofili Teatini',
            email: data['email'],
            message: 'Dettagli Richiesta Iscrizione:\n' +
                     '---------------------------------\n' +
                     'Nome e Cognome: ' + data['nome-cognome'] + '\n' +
                     'Nato/a a: ' + data['luogo-nascita'] + ' il ' + data['data-nascita'] + '\n' +
                     'Residente a: ' + data['residenza'] + '\n' +
                     'Tipologia Socio: ' + data['tipologia-socio'] + '\n' +
                     'Telefono: ' + (data['telefono'] || 'N/D') + '\n' +
                     'Cellulare: ' + (data['cellulare'] || 'N/D') + '\n' +
                     'Lavoro: ' + (data['attivita-lavorativa'] || 'N/D') + '\n' +
                     'Studio: ' + (data['titolo-studio'] || 'N/D') + '\n' +
                     'Attrezzatura: ' + (data['attrezzatura'] || 'Nessuna') + '\n' +
                     'Settore interesse: ' + (data['settore-interesse'] || 'N/D') + '\n' +
                     'Software: ' + (data['software'] || 'N/D') + '\n' +
                     'Email socio: ' + data['email']
          };
          
          fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          })
          .then(function(res) { return res.json(); })
          .then(function(resData) {
            if (resData.success) {
              handleSuccess(form, submitBtn, originalBtnText, msgElement);
            } else {
              handleError(submitBtn, originalBtnText, resData.message || 'Errore nell\'invio del modulo.', msgElement);
            }
          })
          .catch(function() {
            handleError(submitBtn, originalBtnText, 'Errore di rete. Impossibile contattare il server email.', msgElement);
          });
        }
        else {
          // Provider di 'debug' (Default) - Simula l'invio con logging in console
          console.log('[DEBUG] Dati raccolti per l\'invio:', data);
          setTimeout(function() {
            handleSuccess(form, submitBtn, originalBtnText, msgElement);
          }, 1200);
        }
      }
    });
    
    function handleSuccess(form, button, originalText, msgElement) {
      button.disabled = false;
      button.textContent = originalText;
      if (msgElement) {
        msgElement.textContent = 'Richiesta inviata con successo! Ti contatteremo al più presto.';
        msgElement.className = 'text-primary font-body-md mt-md text-center';
        msgElement.style.display = 'block';
        form.reset();
        setTimeout(function () { msgElement.style.display = 'none'; }, 6000);
      }
    }
    
    function handleError(button, originalText, errorText, msgElement) {
      button.disabled = false;
      button.textContent = originalText;
      if (msgElement) {
        msgElement.textContent = errorText;
        msgElement.className = 'text-red-500 font-body-md mt-md text-center';
        msgElement.style.display = 'block';
        setTimeout(function () { msgElement.style.display = 'none'; }, 6000);
      } else {
        alert(errorText);
      }
    }
  });

  // ========== KEYBOARD SUPPORT for div/elements acting as links ==========
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      var target = e.target.closest('[role="button"][data-href]');
      if (target) { e.preventDefault(); window.location.href = target.getAttribute('data-href'); }
    }
  });

  // Elements using data-href behave as full-card links
  document.addEventListener('click', function (e) {
    var card = e.target.closest('[data-href]');
    if (card && !e.target.closest('a, button[type="submit"]')) {
      window.location.href = card.getAttribute('data-href');
    }
  });

  // ========== LENIS SMOOTH SCROLL ==========
  var lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true
  });

  // ========== BACK TO TOP — usa lenis.scrollTo(0) per scroll fluido ==========
  var btt = document.getElementById('back-to-top');
  if (btt) {
    lenis.on('scroll', function (e) {
      if (e.scroll > 400) {
        btt.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        btt.classList.add('opacity-0', 'pointer-events-none');
      }
    });

    btt.addEventListener('click', function () {
      lenis.scrollTo(0);
    });
  }

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();
