// Roni's Hair Station — small enhancements (no framework, no jQuery)
// 1. Highlight today's hours + show open/closed banner
// 2. Wire pre-filled message into SMS link and Messenger link
// 3. Wire the "copy" button for Instagram
// 4. Set the current year in the footer

(function () {
  'use strict';

  // ---- Pre-written booking message (used in SMS body, Messenger ?text=, and copy helper) ----
  var MSG = "Hi Roni! I'd like to book an appointment at Roni's Hair Station. " +
            "I'm interested in [service] if you have availability — " +
            "[day/time that works for me]. Thanks!";

  // ---- Wire SMS pre-filled body (sms: body param is supported on iOS/Android) ----
  function setSmsBody() {
    var links = document.querySelectorAll('a[href^="sms:"]');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      // Replace any existing body= with our MSG
      var base = href.split('?')[0];
      a.setAttribute('href', base + '?body=' + encodeURIComponent(MSG));
    });
  }

  // ---- Wire Messenger pre-filled text (m.me supports ?text=) ----
  function setMessengerBody() {
    var link = document.getElementById('msgFb');
    if (!link) return;
    var href = link.getAttribute('href');
    var sep = href.indexOf('?') >= 0 ? '&' : '?';
    link.setAttribute('href', href + sep + 'text=' + encodeURIComponent(MSG));
  }

  // ---- Show the suggested message box on Instagram click + copy-to-clipboard ----
  function wireCopyButton() {
    var igLink = document.querySelector('a[href*="instagram.com/ronihair85"]');
    var msgBox = document.getElementById('msgBox');
    var msgCopy = document.getElementById('msgCopy');
    var msgFoot = document.getElementById('msgFoot');
    if (!igLink || !msgBox || !msgCopy) return;

    function showBox(e) {
      // Don't open Instagram until the user has had a chance to copy
      e.preventDefault();
      msgBox.hidden = false;
      msgBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Re-open IG after a brief pause so the user can grab the message
      setTimeout(function () {
        if (!msgFoot.textContent || msgFoot.textContent.indexOf('Copied') !== 0) {
          window.open(igLink.href, '_blank', 'noopener');
        }
      }, 1400);
    }
    igLink.addEventListener('click', showBox);

    msgCopy.addEventListener('click', function () {
      var text = document.getElementById('msgText').textContent;
      var done = function () {
        if (msgFoot) {
          msgFoot.textContent = 'Copied! Now tap your messenger button to paste and send.';
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
  }

  function fallbackCopy(text, cb) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      cb();
    } catch (e) {
      if (msgFoot) msgFoot.textContent = 'Copy failed — long-press the message above to copy manually.';
    }
  }

  // ---- Highlight today's row + open/closed banner ----
  function highlightToday() {
    var rows = document.querySelectorAll('.hours > div');
    if (!rows.length) return;
    var now = new Date();
    var day = now.getDay(); // 0 = Sunday
    rows.forEach(function (row) {
      var d = parseInt(row.getAttribute('data-day'), 10);
      if (d === day) row.classList.add('today');
    });

    var status = document.getElementById('hoursStatus');
    if (status) {
      var open = isOpenAt(now);
      if (open.open) {
        status.textContent = 'Open now · closes at ' + open.closesAt;
        status.className = 'hours-status open';
      } else {
        status.textContent = open.message;
        status.className = 'hours-status closed';
      }
    }
  }

  // Hours (24h). Sunday + Monday closed.
  var HOURS = {
    0: null,
    1: null,
    2: { open: '10:00', close: '18:00' },
    3: { open: '10:00', close: '18:00' },
    4: { open: '10:00', close: '18:00' },
    5: { open: '10:30', close: '16:00' },
    6: { open: '10:00', close: '15:00' }
  };

  function toMinutes(hhmm) {
    var p = hhmm.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }
  function formatTime(minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12 = ((h + 11) % 12) + 1;
    return h12 + ':' + (m < 10 ? '0' + m : m) + ' ' + ampm;
  }

  function isOpenAt(date) {
    var day = date.getDay();
    var h = HOURS[day];
    if (!h) {
      // find next opening day
      for (var i = 1; i <= 7; i++) {
        var d = (day + i) % 7;
        if (HOURS[d]) {
          var dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d];
          return { open: false, message: 'Closed · opens ' + dayName + ' at ' + formatTime(toMinutes(HOURS[d].open)) };
        }
      }
      return { open: false, message: 'Closed' };
    }
    var now = date.getHours() * 60 + date.getMinutes();
    var open = toMinutes(h.open);
    var close = toMinutes(h.close);
    if (now < open) {
      return { open: false, message: 'Closed · opens today at ' + formatTime(open) };
    }
    if (now >= close) {
      return { open: false, message: 'Closed for today' };
    }
    return { open: true, closesAt: formatTime(close) };
  }

  // ---- Year ----
  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  // ---- Run on DOM ready ----
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    setSmsBody();
    setMessengerBody();
    wireCopyButton();
    highlightToday();
    setYear();
  });
})();
