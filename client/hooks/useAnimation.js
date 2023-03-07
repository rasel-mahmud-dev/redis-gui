import AOS from 'aos';

const useAnimation = () => {

    const makeAnimation = () => {
            AOS.init({
                offset: 200,
                duration: 200,
                easing: 'ease-in-sine',
                delay: 100,
                once: false,
                disable: 'mobile',
            });
    }

    return {
        makeAnimation
    }

};

export default useAnimation;