
function showPage(key, scroll){
  document.querySelectorAll('.page').forEach(function(p){ p.style.display = 'none'; });
  var el = document.getElementById('page-' + key);
  if(el){ el.style.display = 'block'; } else { document.getElementById('page-home').style.display='block'; key='home'; }
  document.querySelectorAll('.navlink').forEach(function(a){
    if(a.dataset.page === key){ a.classList.add('active'); } else { a.classList.remove('active'); }
  });
  if(scroll !== false){ window.scrollTo({top:0, behavior:'instant'}); }
}
document.addEventListener('click', function(e){
  var a = e.target.closest('.navlink');
  if(a){
    e.preventDefault();
    var key = a.dataset.page;
    history.pushState(null, '', '#' + key);
    showPage(key);
  }
});
window.addEventListener('popstate', function(){
  var key = (location.hash || '#home').replace('#','');
  showPage(key);
});
window.addEventListener('DOMContentLoaded', function(){
  var key = (location.hash || '#home').replace('#','');
  showPage(key, false);
});
