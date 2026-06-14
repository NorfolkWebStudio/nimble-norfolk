
(function(){
  const KEY='nimble_cookie_consent_v1';
  const PIXEL_ID='1409114113262817';
  let pixelLoaded=false;

  function loadMetaPixel(){
    if(pixelLoaded || window.fbq) return;
    pixelLoaded=true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init',PIXEL_ID);fbq('track','PageView');
  }

  function setConsent(value){
    localStorage.setItem(KEY,value);
    const banner=document.getElementById('cookie-banner');
    if(banner) banner.classList.remove('is-visible');
    if(value==='accepted') loadMetaPixel();
  }

  function showBanner(){
    const banner=document.getElementById('cookie-banner');
    if(banner) banner.classList.add('is-visible');
  }

  document.addEventListener('DOMContentLoaded',function(){
    const choice=localStorage.getItem(KEY);
    if(choice==='accepted') loadMetaPixel();
    else if(choice!=='rejected') showBanner();
    document.querySelectorAll('[data-cookie-accept]').forEach(el=>el.addEventListener('click',()=>setConsent('accepted')));
    document.querySelectorAll('[data-cookie-reject]').forEach(el=>el.addEventListener('click',()=>setConsent('rejected')));
    document.querySelectorAll('[data-cookie-settings]').forEach(el=>el.addEventListener('click',function(e){e.preventDefault();showBanner();}));
  });
})();
