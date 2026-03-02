document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     1. 햄버거 메뉴
  ========================= */

  const btn  = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');

  if (btn && menu){

    const openMenu = () => {
      document.body.classList.add('menu-open');
      btn.classList.add('is-active'); // X 변신
      btn.setAttribute('aria-expanded','true');
    };

    const closeMenu = () => {
      document.body.classList.remove('menu-open');
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded','false');
    };

    const isOpen = () =>
      document.body.classList.contains('menu-open');

    btn.addEventListener('click',(e)=>{
      e.preventDefault();
      e.stopPropagation();
      isOpen() ? closeMenu() : openMenu();
    });

    // 메뉴 링크 누르면 닫기
    menu.addEventListener('click',(e)=>{
      if(e.target.closest('a')) closeMenu();
    });

    // 메뉴 밖 클릭 닫기
    document.addEventListener('click',(e)=>{
      if(!isOpen()) return;
      if(menu.contains(e.target)) return;
      if(btn.contains(e.target)) return;
      closeMenu();
    });

    // ESC 닫기
    document.addEventListener('keydown',(e)=>{
      if(e.key==='Escape' && isOpen())
        closeMenu();
    });

  }


/* =========================
   2. TOP 버튼 (iPhone 확정판)
========================= */

const topBtn = document.getElementById('topBtn');

if (topBtn) {

  // ✅ 스크롤값을 여러 경로에서 합쳐서 iOS에서도 잡히게
  const getY = () => {
    const y1 = window.scrollY || 0;
    const y2 = document.documentElement?.scrollTop || 0;
    const y3 = document.body?.scrollTop || 0;
    const y4 = document.scrollingElement?.scrollTop || 0;
    return Math.max(y1, y2, y3, y4);
  };

  const showIfNeeded = () => {
    const y = getY();
    if (y > 120) topBtn.classList.add('show');
    else topBtn.classList.remove('show');
  };

  // ✅ iOS에서 window만으로 부족할 때가 있어서 전부 걸어둠
  window.addEventListener('scroll', showIfNeeded, { passive: true });
  document.addEventListener('scroll', showIfNeeded, { passive: true, capture: true });
  window.addEventListener('touchmove', showIfNeeded, { passive: true });
  window.addEventListener('resize', showIfNeeded);

  // ✅ 혹시 "컨테이너 스크롤" 구조면, 스크롤 가능한 요소들에도 리스너를 붙임(핵심)
  const bindScrollable = () => {
    const els = document.querySelectorAll('body *');
    for (const el of els) {
      const st = getComputedStyle(el);
      if (st.overflowY === 'auto' || st.overflowY === 'scroll') {
        if (el.scrollHeight > el.clientHeight + 2) {
          el.addEventListener('scroll', showIfNeeded, { passive: true });
        }
      }
    }
  };
  bindScrollable();

  // 초기 상태
  showIfNeeded();

  topBtn.addEventListener('click', () => {
    // iOS 안전: 여러 루트에 같이 적용
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo?.({ top: 0, behavior: 'smooth' });
    document.body.scrollTo?.({ top: 0, behavior: 'smooth' });
    document.scrollingElement?.scrollTo?.({ top: 0, behavior: 'smooth' });
  });
}

});