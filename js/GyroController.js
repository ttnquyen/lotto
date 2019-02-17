import { h, render, Component } from 'preact'
import Loader from 'resource-loader'
import { RenderIf, Base, Container, Text } from 'preact-pixi'
import JSZip from 'jszip'
import Jasmine from 'jasmine'
import { Frame } from 'jasmine/preact-pixi'

export default class GyroController extends Base
{
    constructor()
    {
        super()
        this.state =
        {
            sprites: null,
            ready: null,
        }

        Resource.GetAssetUrl('data/data.zip')
        .then(url =>
        {
            let loader = new Loader()
            loader
            .add('zip', url, { xhrType: Loader.Resource.XHR_RESPONSE_TYPE.BUFFER })
            .load(evt =>
            {
                let zip = new JSZip()
                zip.loadAsync(loader.resources['zip'].data).then(zip =>
                {
                    zip.file('sprites.json').async('text').then(data =>
                    {
                        let sprites = new Jasmine(JSON.parse(data), _ => this.setState({ sprites: sprites }))
                    })
                })
            })
        })
        Resource.GetAssetUrl('data/vimpact.ttf').then(url => Resource.LoadFont('vimpact', url))
        socket.on('message', message =>
        {
            if (message.startsWith('s.r'))
            {
                console.log('game started')
                this.setState({ ready: message })
            }
            else
            if (message.startsWith('s.u'))
            {
                console.log('game unavailable')
                this.setState({ ready: 'n/a' })
            }
        })
    }

    componentReady()
    {
        return this.state.sprites && this.state.ready
    }

    render()
    {
        let scale = window.innerHeight / 1334
        return (
            <Container>
                {RenderIf(this.state.ready != 'n/a')(
                    <Container>
                        <Text object='text' text={`You are connected to the game!\n\n\nTap on the screen and\nTILT your device LEFT or RIGHT\nto collect the coins!`}
                            position={[window.innerWidth/2,window.innerHeight*0.25]}
                            anchor ={[0.5,0.5]}
                            style={{
                                fontFamily: 'vimpact',
                                fontSize: 45 * scale,
                                fill: 0x2b2b2b,
                                align: 'center'
                            }}
                        />
                        <Frame position={[window.innerWidth/2,window.innerHeight*0.6]} jasmine={this.state.sprites} index={SPRITE_ATLAS_FRAME_MOBILE} scale={[scale,scale]} />
                        <Frame position={[window.innerWidth*0.3,window.innerHeight*0.6]} jasmine={this.state.sprites} index={SPRITE_ATLAS_FRAME_TILT_LEFT} scale={[scale,scale]} alpha={0.5} />
                        <Frame position={[window.innerWidth*0.7,window.innerHeight*0.6]} jasmine={this.state.sprites} index={SPRITE_ATLAS_FRAME_TILT_RIGHT} scale={[scale,scale]} alpha={0.5} />
                        <Frame position={[window.innerWidth*0.37,window.innerHeight*0.46]} jasmine={this.state.sprites} index={SPRITE_ATLAS_FRAME_LEFT_ARROW} scale={[scale,scale]} />
                        <Frame position={[window.innerWidth*0.63,window.innerHeight*0.46]} jasmine={this.state.sprites} index={SPRITE_ATLAS_FRAME_RIGHT_ARROW} scale={[scale,scale]} />
                        <Frame position={[0,window.innerHeight]} jasmine={this.state.sprites} index={SPRITE_ATLAS_FRAME_LOGO} scale={[scale,scale]} />
                    </Container>
                )}
                {RenderIf(this.state.ready == 'n/a')(
                    <Container>
                        <Text object='text' text={`Sorry, someone is playing.\nPlease try again later!`}
                            position={[window.innerWidth/2,window.innerHeight/2]}
                            anchor ={[0.5,0.5]}
                            style={{
                                fontFamily: 'vimpact',
                                fontSize: 45 * scale,
                                fill: 0x2b2b2b,
                                align: 'center'
                            }}
                        />
                        <Frame position={[0,window.innerHeight]} jasmine={this.state.sprites} index={SPRITE_ATLAS_FRAME_LOGO} scale={[scale,scale]} />
                    </Container>
                )}
            </Container>
        )
    }
}
