import fetch from '../config/fetch'

/*
*  获取定位
* */

export const guessCity = () =>fetch('/v1/cityes', {
    type: 'guesss'
})

