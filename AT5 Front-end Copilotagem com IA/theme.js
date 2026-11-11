const KEY = 'margem-humana-theme';
export function readPreference(storage) {
  try { const value = storage.getItem(KEY); return ['dark','light'].includes(value) ? value : null; }
  catch { return null; }
}
export function writePreference(storage,value) {
  try { storage.setItem(KEY,value); return true; } catch { return false; }
}
export function mountTheme(button) {
  // O próprio acesso à propriedade localStorage pode lançar SecurityError.
  let storage;
  try { storage = window.localStorage; } catch { storage = null; }
  const media = matchMedia('(prefers-color-scheme: dark)');
  let preference = readPreference(storage);
  function apply(value) {
    document.documentElement.classList.toggle('theme-dark',value==='dark');
    document.documentElement.setAttribute('data-bs-theme',value);
    button.setAttribute('aria-pressed',String(value==='dark'));
    button.textContent = value==='dark' ? 'Tema claro' : 'Tema escuro';
    button.setAttribute('aria-label', value==='dark' ? 'Tema escuro ativado. Mudar para tema claro' : 'Tema escuro desativado. Mudar para tema escuro');
    document.dispatchEvent(new CustomEvent('mh:theme'));
  }
  apply(preference ?? (media.matches?'dark':'light'));
  button.addEventListener('click',()=>{
    preference = document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark';
    const persisted = writePreference(storage,preference);
    button.title = persisted ? 'Preferência salva neste navegador.' : 'Tema alterado nesta sessão; armazenamento indisponível.';
    apply(preference);
  });
  media.addEventListener('change',event=>{if (!preference) apply(event.matches?'dark':'light');});
}
