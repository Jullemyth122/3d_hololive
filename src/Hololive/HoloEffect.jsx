import React, { useEffect } from 'react'
import * as THREE from 'three'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Reflector } from 'three/examples/jsm/objects/Reflector'

import mask1 from './img/h2.png'
import mask2 from './img/h1.png'
import mask3 from './img/h3.png'
import mask4 from './img/h4.png'
import mask5 from './img/h5.png'
import mask6 from './img/h6_.png'
import mask7 from './img/h7_.png'
import mask8 from './img/h8_.png'
import mask9 from './img/h9_.png'
import mask10 from './img/h10_.png'
import mask11 from './img/h11_.png'

import img1 from './img/h2_.png'
import img2 from './img/h1_.png'
import img3 from './img/h3_.png'
import img4 from './img/h4_.png'
import img5 from './img/h5_.png'
import img6 from './img/h6.png'
import img7 from './img/h7.png'
import img8 from './img/h8.png'
import img9 from './img/h9.png'
import img10 from './img/h10.png'
import img11 from './img/h11.png'

import video from './img/holilive.mp4'
import audio from './img/holo.mp3'

function HoloEffect() {
    
    
    
    useEffect(() => {
        
        const audio1 = new Audio(audio);

        window.addEventListener("click",() => {
            audio1.play();
            audio1.volume = 0.4;
        })


        const mq = window.matchMedia("(max-width:700px)")


        if (mq.matches) {
            
        } else {
            const lenis = new Lenis({
                lerp: 0.1,
                smooth: true,
                direction: 'vertical',
              })
              
              function raf() {
                lenis.raf()
                requestAnimationFrame(raf)
              }
              
              requestAnimationFrame(raf)
        }

        gsap.registerPlugin(ScrollTrigger,ScrollToPlugin)
        var renderer, scene, camera;
        let groundMirror;


        let container = document.querySelector('.container')
        let h1Container = document.querySelector('.container-fluid .title')

        let wordTransition = gsap.timeline()
        wordTransition.fromTo(h1Container,{
            width:"10%",
            height:"5%",
        },{
            height:"30%",
            ease:"power2.inOut",
            duration:1,
        })
        wordTransition.fromTo(h1Container,{
            width:"10%"
        },{
            width:"70%",
            ease:"power2.inOut",
            duration:1,
        })

        let Maincontainer = document.querySelector('.container-fluid')

        init();

        function init() {


            renderer = new THREE.WebGLRenderer( { antialias: true,alpha:true } );
            renderer.setPixelRatio( devicePixelRatio );
            renderer.setSize( container.clientWidth, container.clientHeight );
            renderer.setAnimationLoop( animation );
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild( renderer.domElement );

            camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 1, 1000 );
            camera.position.set( 4, 8, -70 );
            camera.rotateY(Math.PI)
            // camera.lookAt(0,0,0)

            scene = new THREE.Scene();

            RectAreaLightUniformsLib.init();
            
            let textures = [
                new THREE.TextureLoader().load(mask1),
                new THREE.TextureLoader().load(mask2),
                new THREE.TextureLoader().load(mask3),
                new THREE.TextureLoader().load(mask4),
                new THREE.TextureLoader().load(mask5),
                new THREE.TextureLoader().load(mask6),
                new THREE.TextureLoader().load(mask7),
                new THREE.TextureLoader().load(mask8),
                new THREE.TextureLoader().load(mask9),
                new THREE.TextureLoader().load(mask10),
                new THREE.TextureLoader().load(mask11),
            ]


            let colors = [
                0x87e1f5,
                0xf7e38b,
                0xffd2a1,
                0xfaa5f3,
                0xd88bf0,
                0xe5b3f5,
                0xfff761,
                0xe687b6,
                0xe3368c,
                0xbf3beb,
                0xed1c1c,
            ]

            const vid = document.getElementById( 'video' );
            vid.play();
            const vidtexture = new THREE.VideoTexture( vid );
            vidtexture.minFilter = THREE.NearestFilter;

            const geoVid = new THREE.PlaneGeometry( 100,50 );
            
            const matVid = new THREE.MeshBasicMaterial({ 
                map:vidtexture,
                color:0xffffff, 
                transparent:true
            });

            const vidMesh = new THREE.Mesh(geoVid,matVid)
            vidMesh.position.set(0,20,30)
            vidMesh.rotateY(-Math.PI)
            scene.add(vidMesh)

            let tl = gsap.timeline({
                scrollTrigger:{
                    trigger:Maincontainer,
                    toggleActions:"play reverse play reverse",
                    pin:true,
                    scrub:true,
                    end:() => `${container.clientHeight * textures.length + 2}px`,
                }
            })

            tl.add(gsap.to(
                document.querySelectorAll('.container-fluid .main-item')[0],{
                    y:"-300%",
                }
            ))

            // Torus Knot
            textures.forEach((elem,i) => {


                let rectLight1 = new THREE.RectAreaLight( colors[i], 5, 4, 10 );
                rectLight1.position.set( 8 * (-i + textures.length/2) , 5, 5 );
                rectLight1.lookAt(0+8*(-i+textures.length/2),5,0)

                gsap.fromTo(rectLight1.rotation,{y:1},{
                    y:3*Math.PI,
                    duration: textures.length / (textures.length - i + 1),
                    ease:"power2.inOut"
                })

                scene.add( rectLight1 );
    
                scene.add( new RectAreaLightHelper( rectLight1 ) );

                const geoImage = new THREE.PlaneBufferGeometry( 10,10,2 );
                const geoPlane = new THREE.PlaneGeometry( 40,100 );

                groundMirror = new Reflector( geoPlane, {
					clipBias: 0.01,
					textureWidth: container.clientWidth * devicePixelRatio,
					textureHeight: container.clientHeight * devicePixelRatio,
					color: 0xbdbdbd,
				} );

                groundMirror.position.set(0+8*(-i+textures.length/2),3,0)
				groundMirror.position.y = 1;
				groundMirror.rotateX( - Math.PI / 2 );
				scene.add( groundMirror );

                const matImage = new THREE.MeshBasicMaterial({ 
                    map:elem, 
                    side:THREE.DoubleSide,
                    transparent:true,
                    depthTest:false,
                    depthWrite:false,
                });

                const meshImage = new THREE.Mesh( geoImage, matImage );
                meshImage.name = 'meshImage';
    
                meshImage.position.set( 0 + 8 * (-i + textures.length/2),5, 0 );

                tl.add(gsap.to(
                    document.querySelectorAll('.container-fluid .main-item')[i],{
                        y:"-300%",
                    }
                ))
                tl.add(gsap.to(camera.position,{
                    x:meshImage.position.x,
                    y:5,
                    z:-30,
                    ease:"none"
                }))

                tl.add(gsap.fromTo(rectLight1.rotation,{
                    y:3*Math.PI
                },
                {
                    y:4*Math.PI,
                    ease:"none"
                }))

                gsap.fromTo([meshImage.scale],{y:0},{
                    y:1,
                    duration: 1 + i/Math.sqrt(textures.length),
                    ease:"power2.inOut"
                })

                scene.add( meshImage );
                
            })

            console.log(document.querySelectorAll('.container-fluid .main-item')[textures.length ])
            tl.add(gsap.to(
                document.querySelectorAll('.container-fluid .main-item')[textures.length ],{
                    y:"-100%",
                }
            ))


            
            const planeGeo = new THREE.PlaneGeometry( 1000.1, 1000.1 );

            const planeTop = new THREE.Mesh( planeGeo, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
            planeTop.position.y = 100;
            planeTop.rotateX( Math.PI / 2 );
            scene.add( planeTop );

            const planeBottom = new THREE.Mesh( planeGeo, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
            planeBottom.rotateX( - Math.PI / 2 );
            scene.add( planeBottom );

            const planeFront = new THREE.Mesh( planeGeo, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
            planeFront.position.z = 50;
            planeFront.position.y = 50;
            planeFront.rotateY( Math.PI );
            scene.add( planeFront );

            const planeRight = new THREE.Mesh( planeGeo, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
            planeRight.position.x = 50;
            planeRight.position.y = 50;
            planeRight.rotateY( - Math.PI / 2 );
            scene.add( planeRight );

            const planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
            planeLeft.position.x = - 50;
            planeLeft.position.y = 50;
            planeLeft.rotateY( Math.PI / 2 );
            scene.add( planeLeft );

            let test = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(2000,2000),
                new THREE.MeshBasicMaterial()
            )
            

            window.addEventListener( 'resize', onWindowResize );
            
            
        }

        function onWindowResize() {

            renderer.setSize( container.clientWidth, container.clientHeight );
            camera.aspect = ( container.clientWidth / container.clientHeight );
            camera.updateProjectionMatrix();

        }

        function animation( time ) {

            renderer.render( scene, camera );
        }


        const titleText1 = document.querySelector('.title h1')
        const titleText2 = document.querySelector('.title h2')


        function textConvertAlphabet(array) {
            array.innerHTML = array.textContent.replace(/\S/g,
                `
                <span class="parentH">
                    <span class="hide">$&</span>
                    <span class="hide2">$&</span>
                </span>
                `
            )
        }
        textConvertAlphabet(titleText1)
        textConvertAlphabet(titleText2)

        // console.log(titleText1.querySelectorAll('.hide'))
        function textAlphaAnim(array) {
            gsap.fromTo(array.querySelectorAll('.hide'),{
                y:"100%",
            },{
                y:"0%",
                ease:"expo.inOut",
                duration:2,
                stagger:0.06,
            })
        }

        function hoverAlphabet1(array) {
            let utils = gsap.utils.toArray(array.querySelectorAll('.parentH'))
            let activeElem1;
            let activeElem2;
            utils.forEach((elem,i) => {
                elem.children[0].start = gsap.to(elem.children[0],{
                    y:-100,
                    ease: "power2.out",
                    duration: 0.4,
                    paused: true,
                })

                elem.children[1].normal = gsap.to(elem.children[1],{
                    y:0,
                    ease: "power2.out",
                    duration: 0.4,
                    paused: true,
                })

                elem.addEventListener("mouseover", () => {
                    if (activeElem1) {
                        activeElem1.start.reverse();
                        activeElem2.normal.reverse();
                    }
                    activeElem1 = elem.children[0];
                    activeElem2 = elem.children[1];
                    elem.children[0].start.play();
                    elem.children[1].normal.play();

                })
            })


            

        }

        textAlphaAnim(titleText1)
        textAlphaAnim(titleText2)


        const textTimeout = setTimeout(() => {
            hoverAlphabet1(titleText1)
            hoverAlphabet1(titleText2)
        },3000)

        const circle = document.querySelector('#c1');
        const circleSvg = document.querySelector("svg.circle")
        circle.style.strokeDasharray = `0 100`;
        circle.style.strokeDashoffset = `-50`;
        
        circleSvg.addEventListener("mouseleave",() => {
            gsap.to(circle,{
                duration:1.3,
                strokeDasharray:"0 100",
                strokeDashoffset:"-50",
                ease:'expo.inOut'
            })
        })
        circleSvg.addEventListener("mouseover",() => {
            gsap.to(circle,{
                duration:1.3,
                strokeDasharray:"101 100",
                strokeDashoffset:"0",
                ease:'expo.inOut'
            })
        })

        const scrollDown = document.querySelector(".scrollDown")

        scrollDown.addEventListener("click",() => {
            gsap.to(window,{
                scrollTo:Maincontainer.clientHeight,
                duration:2,
                ease:"power2.inOut",
                overwrite:true,
            })
        })


    },[])

    return (
        <div className='container-fluid'>
            <div className="container"></div>

            <div className="title main-item">
                <h1>『HOLOLIVE』 TEASER 『2』 </h1>
                <h2>『ホロライブ・オルタナティブ』 2ndティザーPV </h2>
                <h5> Click to play music </h5>
            </div>

            <div className="gawrgura main-item">
                <div className="left">
                    <img src={img1} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"rgba(135, 207, 235, 0.603)"}}>
                        <h1> Gawr Gura </h1>
                        <h2> Small Shark </h2>
                    </div>
                </div>
            </div>
            <div className="amelia main-item">
                <div className="left">
                    <img src={img2} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#f7e38b79"}}>
                        <h1> Amelia Watson </h1>
                        <h2> Detective </h2>
                    </div>
                </div>
            </div>
            <div className="kiara main-item">
                <div className="left">
                    <img src={img3} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#ffd2a193"}}>
                        <h1> Takanashi Kiara </h1>
                        <h2> Chicken Eater </h2>
                    </div>
                </div>
            </div>
            <div className="mori main-item">
                <div className="left">
                    <img src={img4} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#faa5f39a"}}>
                        <h1> Mori Calliope </h1>
                        <h2> Grim Reaper </h2>
                    </div>
                </div>
            </div>
            <div className="inamae main-item">
                <div className="left">
                    <img src={img5} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#d88bf091"}}>
                        <h1> Ninomae Ina'nis </h1>
                        <h2> Kraken </h2>
                    </div>
                </div>
            </div>
            <div className="hoshinova main-item">
                <div className="left">
                    <img src={img6} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#e5b3f58c"}}>
                        <h1> Moona Hishinova </h1>
                        <h2> Moon-moon </h2>
                    </div>
                </div>
            </div>
            <div className="rosenthal main-item">
                <div className="left">
                    <img src={img7} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#f7eb159a"}}>
                        <h1> Aki Rosenthal </h1>
                        <h2> Queen Spinner </h2>
                    </div>
                </div>
            </div>
            <div className="himemori main-item">
                <div className="left">
                    <img src={img8} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#e2258494"}}>
                        <h1> Airani Iofifteen </h1>
                        <h2> Artists </h2>
                    </div>
                </div>
            </div>
            <div className="airani main-item">
                <div className="left">
                    <img src={img9} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#bf3beb8e"}}>
                        <h1> Himemori Luna </h1>
                        <h2> Candy Princess </h2>
                    </div>
                </div>
            </div>
            <div className="tokoyami main-item">
                <div className="left">
                    <img src={img10} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#bf3beb7a"}}>
                        <h1> Tokoyami Towa </h1>
                        <h2> Small Devil </h2>
                    </div>
                </div>
            </div>
            <div className="azki main-item">
                <div className="left">
                    <img src={img11} alt="" />
                </div>
                <div className="right">
                    <div className="colorizeDiv" style={{background:"#ed1c1c85"}}>
                        <h1> AZKi</h1>
                        <h2> Singer</h2>
                    </div>
                </div>
            </div>

            <div className="scrollDown">
                <div className="left">
                    <svg width="13" height="33" viewBox="0 0 13 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6613 31.7651L1.52305 24.6347C1.35623 24.5047 1.22134 24.3389 1.12851 24.1499C1.03568 23.9609 0.987318 23.7536 0.987061 23.5434L0.987061 20.7261C0.987061 20.4348 1.32535 20.2739 1.5582 20.4522L9.59809 26.726L9.59809 0.413252C9.59809 0.22195 9.75625 0.0654297 9.94956 0.0654297L12.5856 0.0654297C12.7789 0.0654297 12.9371 0.22195 12.9371 0.413252L12.9371 30.6694C12.9371 31.8346 11.5839 32.4824 10.6613 31.7651Z" fill="black"/>
                    </svg>
                </div>
                <div className="right">
                    <svg width="12" height="32" viewBox="0 0 12 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.32577 31.6996L11.464 24.5693C11.6308 24.4393 11.7657 24.2735 11.8586 24.0845C11.9514 23.8955 11.9997 23.6881 12 23.478V20.6606C12 20.3693 11.6617 20.2085 11.4289 20.3867L3.38897 26.6606L3.38897 0.347822C3.38897 0.15652 3.23081 0 3.0375 0L0.40147 0C0.208161 0 0.0500002 0.15652 0.0500002 0.347822L0.0500002 30.604C0.0500002 31.7692 1.40316 32.417 2.32577 31.6996Z" fill="black"/>
                    </svg>
                </div>
                <svg className='circle' width="100" xmlns="http//www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <circle id="c1" cx="25" cy="25" r="24" strokeWidth="0.5" stroke="black" fill="none" transform="rotate(90 25 25)"  pathLength="100" />
                </svg>
            </div>

            <video id="video" loop muted crossOrigin="anonymous" playsInline style={{display:"none"}}>
                <source src={video}/>
            </video>

        </div>
    )

}

export default HoloEffect