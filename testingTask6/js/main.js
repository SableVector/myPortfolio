document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const menuBurger = () => {
        if (document.querySelector('#burger')) {
            document.addEventListener('click', function (e) {
                const target = e.target;

                if (target && e.target.closest('#burger')) {
                    bodyLockToggle();
                    document.documentElement.classList.toggle("menu-open");
                }
            });
        };
    };
    menuBurger();

    // SpollerS
    const spollers = () => {
        const spollersArray = document.querySelectorAll('[data-spollers]');
        if (spollersArray.length > 0) {
            // Получение обычных слойлеров
            const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            // Инициализация обычных слойлеров
            if (spollersRegular.length) {
                initSpollers(spollersRegular);
            }
            // Инициализация
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add('js-spoller-init');
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove('js-spoller-init');
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            // Работа с контентом
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute('tabindex');
                            if (!spollerTitle.classList.contains('_spoller-active')) {
                                spollerTitle.nextElementSibling.hidden = true;
                            }
                        } else {
                            spollerTitle.setAttribute('tabindex', '-1');
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }

            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest('[data-spoller]')) {
                    const spollerTitle = el.closest('[data-spoller]');
                    const spollersBlock = spollerTitle.closest('[data-spollers]');
                    const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll('._slide').length) {
                        if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
                            hideSpollersBody(spollersBlock);
                        }
                        spollerTitle.classList.toggle('_spoller-active');
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
                    spollerActiveTitle.classList.remove('_spoller-active');
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            // Закрытие при клике вне спойлера
            const spollersClose = document.querySelectorAll('[data-spoller-close]');
            if (spollersClose.length) {
                document.addEventListener("click", function (e) {
                    const el = e.target;
                    if (!el.closest('[data-spollers]')) {
                        spollersClose.forEach(spollerClose => {
                            const spollersBlock = spollerClose.closest('[data-spollers]');
                            if (spollersBlock.classList.contains('js-spoller-init')) {
                                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                                spollerClose.classList.remove('_spoller-active');
                                _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                            }
                        });
                    }
                });
            }
        }
    }
    spollers();

    // Swiper-slider
    // Добавить классы слайдерам
    // swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
    const bildSliders = () => {
        let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
        if (sliders) {
            sliders.forEach(slider => {
                slider.parentElement.classList.add('swiper');
                slider.classList.add('swiper-wrapper');
                for (const slide of slider.children) {
                    slide.classList.add('swiper-slide');
                }
            });
        }
    };
    bildSliders();

    if (document.querySelector('.reviews__slider')) {
        const swiper = new Swiper('.reviews__slider', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            observer: true,
            observeParents: true,
            slidesPerView: 2,
            spaceBetween: 20,
            autoHeight: true,
            speed: 800,

            //touchRatio: 0,
            //simulateTouch: false,
            loop: true,

            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },

            navigation: {
                prevEl: '.reviews-buttons__button.prev',
                nextEl: '.reviews-buttons__button.next',
            },

            breakpoints: {
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                    autoHeight: true,
                },
                // 768: {
                //     slidesPerView: 1,
                //     spaceBetween: 20,
                // },
                // 992: {
                //     slidesPerView: 1.3,
                //     spaceBetween: 10,
                // },
                1268: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
            },
        });
    }
    // ===================================
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains('lock')) {
            bodyUnlock(delay);
        } else {
            bodyLock(delay);
        }
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-padding]");
            setTimeout(() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = '0px';
                }
                body.style.paddingRight = '0px';
                document.documentElement.classList.remove("lock");
            }, delay);
            bodyLockStatus = false;
            setTimeout(function () {
                bodyLockStatus = true;
            }, delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-padding]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
            }
            body.style.paddingRight = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
            document.documentElement.classList.add("lock");

            bodyLockStatus = false;
            setTimeout(function () {
                bodyLockStatus = true;
            }, delay);
        }
    };

    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty('height') : null;
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                !showmore ? target.style.removeProperty('overflow') : null;
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
                // Создаем событие
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target: target
                    }
                }));
            }, duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty('height') : null;
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
                // Создаем событие
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target: target
                    }
                }));
            }, duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
    };

    // dropdown
    const header = document.querySelector('header');
    const dropdownBtns = header.querySelectorAll('[data-dropdown]');

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            this.parentElement.classList.toggle('active');
        });
    })
});