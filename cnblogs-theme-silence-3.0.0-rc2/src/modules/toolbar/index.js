import "./index.less";
import { isPostPage } from '@consts/tools';
import options from '@/consts/options';

function buildToolbar() {
    $('body').append(`<div class="esa-toolbar">
        <div class="material-symbols-outlined bars">more_horiz</div>
        <span class="material-symbols-outlined up" title="返回顶部">keyboard_arrow_up</span>
        <span class="material-symbols-outlined mode" title="切换模式">dark_mode</span>
        <span class="material-symbols-outlined skin" title="切换主题">palette</span>
        <div class="skin-popup">
            <div class="item">
                <div class="title">选择主题</div>
                <div class="themes">
                    <button data-theme="a" style="background: #2D8CF0;"></button>
                    <button data-theme="b" style="background: #FA7298;"></button>
                    <button data-theme="c" style="background: #42B983;"></button>
                    <button data-theme="d" style="background: #607D8B;"></button>
                    <button data-theme="e" style="background: #5E72E4;"></button>
                    <button data-theme="f" style="background: #FF9700;"></button>
                    <button data-theme="g" style="background: #FF5722;"></button>
                    <button data-theme="h" style="background: #009688;"></button>
                    <button data-theme="i" style="background: #673BB7;"></button>
                    <button data-theme="j" style="background: #906f61;"></button>
                </div>
            </div>
        </div>
        </div>
    </div>`);

    const showContents = isPostPage() && options.catalog.enable;

    if (showContents) {
        $('.esa-toolbar').append(`<span class="material-symbols-outlined contents" title="目录导航">menu</span>`);
    }

    const modeKey = `silence-mode-${currentBlogApp}`;
    const themeKey = `silence-theme-${currentBlogApp}`;

    const hour = new Date().getHours();

    const themeLoading = sessionStorage.getItem(themeKey) || options.defaultTheme;
    const modeLoading = sessionStorage.getItem(modeKey) || (options.defaultMode == 'auto' ? (hour >= 6 && hour < 18 ? 'light' : 'dark') : options.defaultMode);

    $('html').attr('mode', modeLoading);
    $('html').attr('theme', themeLoading);

    const $toolbar = $('.esa-toolbar');
    const $skinPopup = $('.skin-popup');

    $toolbar.find('.mode').html(modeLoading == 'light' ? 'dark_mode' : 'light_mode');

    var skinPopEl = document.getElementsByClassName('skin-popup')[0];

    let show = false;
    $toolbar.find('.bars').click(function () {
        if (!show) {
            $toolbar.find('.bars').addClass('bars-show');
            $toolbar.find('.up').addClass('up-show');
            $toolbar.find('.mode').addClass('mode-show');
            $toolbar.find('.skin').addClass('skin-show');
            if (showContents) {
                $toolbar.find('.contents').addClass('contents-show');
            }
        } else {
            $toolbar.find('.bars').removeClass('bars-show');
            $toolbar.find('.up').removeClass('up-show');
            $toolbar.find('.mode').removeClass('mode-show');
            $toolbar.find('.skin').removeClass('skin-show');
            if (showContents) {
                $toolbar.find('.contents').removeClass('contents-show');
            }
        }
        show = !show;
    });

    $toolbar.find('.up').click(() => {
        $('html, body').animate({ scrollTop: 0 }, 450);
    });

    $toolbar.find('.mode').click(function() {
        let curMode = $('html').attr('mode');
        let newMode = curMode == 'light' ? 'dark' : 'light';
        sessionStorage.setItem(modeKey, newMode);
        $(this).html(`${curMode}_mode`);
        $('html').attr('mode', newMode);
    });

    $toolbar.find('.skin').click((e) => {
        e.stopPropagation();
        $skinPopup.slideToggle();
    });

    skinPopEl.addEventListener('click', function(ev) {
        ev.stopPropagation()
        if (ev.target.nodeName === 'BUTTON') {
            console.log(ev);
            var theme = ev.target.dataset.theme;
            sessionStorage.setItem(themeKey, theme);
            $('html').attr('theme', theme);
        }
    })

    document.addEventListener('click', function(ev) {
        if (skinPopEl && skinPopEl.style.display === 'block') {
            skinPopEl.style.display = 'none';
        }
    })

    let showcontents = false;
    $toolbar.find('.contents').click(() => {
        $('.esa-contents').toggleClass(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                return 'noactive';
            } else {
                $(this).removeClass('noactive');
                return 'active';
            }
        });

        if (!showcontents) {
            $('#home').css({ "width": "calc(100% - 252px)"});
            showcontents = true;
        } else {
            $('#home').css({ "width": "100%" });
            showcontents = false;
        }
    });

    if (isPostPage()) {
        $toolbar.find('.bars').trigger('click');
    }
}

export default buildToolbar;