import { h, render, Component } from 'preact'
import { Stage } from 'preact-pixi'
import NoSleep from 'nosleep.js'
import './Resource'
import GyroController from './GyroController'
class AppPixi extends Component
{
    render()
    {
        return (
            <Stage
                options={{
                    width: window.innerWidth,
                    height: window.innerHeight,
                    backgroundColor: 0xe1e0e1,
                }}
            >
                <GyroController />
            </Stage>
        )
    }
}

window.main = _ =>
{
    // const OnPointerDown = evt =>
    // {
    //     document.body.style.backgroundColor = '#FF000044'
    //     socket.send(`i.d.${evt.x}.${evt.y}`)
    // }
    // const OnPointerMove = evt =>
    // {
    //     socket.send(`i.m.${evt.x}.${evt.y}`)
    // }
    // const OnPointerUp = evt =>
    // {
    //     document.body.style.backgroundColor = null
    //     socket.send(`i.u.${evt.x}.${evt.y}`)
    // }
    // document.body.addEventListener('touchstart', OnPointerDown)
    // document.body.addEventListener('mousedown', OnPointerDown)
    // document.body.addEventListener('touchmove', OnPointerMove)
    // document.body.addEventListener('mousemove', OnPointerMove)
    // document.body.addEventListener('touchend', OnPointerUp)
    // document.body.addEventListener('mouseup', OnPointerUp)

    const noSleep = new NoSleep()
    noSleep.disable()
    global.socket = require('socket.io-client')(`ws://${SERVER_DOMAIN}:${SERVER_PORT}/`, {transports: ['websocket']})
    socket.send(`f.${window.location.search.slice(1)}`)
    socket.on('connected', message => console.log(message))
    if (window.DeviceOrientationEvent)
    {
        noSleep.enable()
        window.addEventListener('deviceorientation', eventData =>
        {
            if (eventData.gamma < -30)
            {
                socket.send('i.l')
            }
            else
            if (eventData.gamma > 30)
            {
                socket.send('i.r')
            }
            else
            {
                socket.send('i.m')
            }
        }, false)
    }

    render(<AppPixi />, document.body)
}
