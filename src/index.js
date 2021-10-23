import './scss/style.scss';

const App = {
    data() {
        return {
            lots: [
                {
                    imgSrc: '/img/1.png',
                    title: '«Рождение Венеры» Сандро Боттичелли',
                    lastPrice: '2 000 000 $',
                    realPrice: '1 000 000 $',
                    isActive: false,
                    activeClass: 'active',
                    isSold: false,
                    sold: 'sold',
                    button: 'Купить',
                },
                {
                    imgSrc: '/img/2.png',
                    title: '«Сотворение Адама» Микеланджело',
                    lastPrice: '',
                    realPrice: '3 000 000 $',
                    isActive: false,
                    activeClass: 'active',
                    isSold: false,
                    sold: 'sold',
                    button: 'Купить',
                },
                {
                    imgSrc: '/img/3.png',
                    title: '«Урок анатомии» Рембрандт',
                    lastPrice: '6 000 000 $',
                    realPrice: '5 000 000 $',
                    isActive: false,
                    activeClass: 'active',
                    isSold: false,
                    sold: 'sold',
                    button: 'Купить',
                },
                {
                    imgSrc: '/img/4.png',
                    title: '«Урок анатомии» Рембрандт',
                    lastPrice: '',
                    realPrice: 'Продана на аукционе',
                    isActive: false,
                    activeClass: 'active',
                    isSold: true,
                    sold: 'sold',
                    button: 'Купить',
                },
            ],
        };
    },

    methods: {
        buttonClick(lot) {
            if (lot.button == 'Купить') {
                lot.isActive = !lot.isActive;
                lot.button = 'loading...';
                setTimeout(() => {
                    lot.button = 'В корзине';
                }, 2000);
            } else {
                lot.isActive = !lot.isActive;
                lot.button = 'loading...';
                setTimeout(() => {
                    lot.button = 'Купить';
                }, 2000);
            }
        },
    },
};

Vue.createApp(App).mount('#app');
