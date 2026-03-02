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
     2. TOP 버튼 (모바일 포함)
  ========================= */

  const topBtn = document.getElementById('topBtn');

  if(topBtn){

    const getScrollTop = () =>
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const toggleTopBtn = () => {

      const y = getScrollTop();

      // 모바일에서도 보이게 낮춤
      if(y > 120)
        topBtn.classList.add('show');
      else
        topBtn.classList.remove('show');

    };

    window.addEventListener(
      'scroll',
      toggleTopBtn,
      {passive:true}
    );

    toggleTopBtn();

    topBtn.addEventListener('click',()=>{
      window.scrollTo({
        top:0,
        behavior:'smooth'
      });
    });

  }

});