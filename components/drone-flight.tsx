"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function CinemaDrone(){
  const craft=useRef<THREE.Group>(null),gimbal=useRef<THREE.Group>(null),rotors=useRef<THREE.Group[]>([]),progress=useRef(0);
  useEffect(()=>{const update=()=>{const hero=document.querySelector(".hero-wrap");if(!hero)return;const rect=hero.getBoundingClientRect(),travel=hero.clientHeight-innerHeight;progress.current=Math.min(1,Math.max(0,-rect.top/travel))};update();addEventListener("scroll",update,{passive:true});addEventListener("resize",update);return()=>{removeEventListener("scroll",update);removeEventListener("resize",update)}},[]);
  useFrame(({clock})=>{const unit=craft.current;if(!unit)return;const p=progress.current;unit.position.set(THREE.MathUtils.lerp(-2.5,3.8,p),THREE.MathUtils.lerp(.9,-.18,p)+Math.sin(p*Math.PI*2)*.24,THREE.MathUtils.lerp(.15,1.35,p));unit.rotation.set(.07+Math.sin(p*Math.PI)*.12,THREE.MathUtils.lerp(.52,-.62,p),THREE.MathUtils.lerp(.1,-.2,p));rotors.current.forEach(rotor=>{if(rotor)rotor.rotation.y=clock.elapsedTime*42});if(gimbal.current){gimbal.current.rotation.y=Math.sin(clock.elapsedTime*.65)*.18;gimbal.current.rotation.x=-.22+Math.sin(clock.elapsedTime*.45)*.05}});
  const arms:[number,number,number][]=[[-1.12,0,-.78],[1.12,0,-.78],[-1.12,0,.78],[1.12,0,.78]];
  return <Float speed={.65} rotationIntensity={.03} floatIntensity={.12}><group ref={craft} scale={1.05}>
    <mesh scale={[1.55,.32,.94]}><sphereGeometry args={[.72,32,20]}/><meshStandardMaterial color="#141414" metalness={.92} roughness={.17}/></mesh>
    <mesh position={[0,.18,-.46]} scale={[.82,.14,.4]}><sphereGeometry args={[.7,28,16]}/><meshStandardMaterial color="#242424" metalness={.8} roughness={.2}/></mesh>
    <mesh position={[0,.29,-.08]} scale={[.72,.03,.54]}><boxGeometry args={[1,1,1]}/><meshStandardMaterial color="#d4af37" emissive="#382a08" metalness={.8}/></mesh>
    {arms.map((point,index)=><group key={index} position={point} rotation={[0,index%2?-.36:.36,0]}><mesh position={[point[0]>0?.14:-.14,0,0]}><boxGeometry args={[1.36,.1,.13]}/><meshStandardMaterial color="#1d1d1d" metalness={.9} roughness={.16}/></mesh><mesh position={[point[0]>0?.75:-.75,.04,0]}><cylinderGeometry args={[.19,.22,.28,24]}/><meshStandardMaterial color="#0c0c0c" metalness={.85} roughness={.2}/></mesh><group ref={node=>{if(node)rotors.current[index]=node}} position={[point[0]>0?.75:-.75,.2,0]}><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.16,.16,.07,20]}/><meshStandardMaterial color="#d4af37" emissive="#60470b" metalness={.8}/></mesh><mesh rotation={[0,0,Math.PI/2]}><boxGeometry args={[1.72,.022,.072]}/><meshStandardMaterial color="#252525" metalness={.75} roughness={.2}/></mesh><mesh rotation={[0,Math.PI/2,0]}><boxGeometry args={[1.72,.022,.072]}/><meshStandardMaterial color="#252525" metalness={.75} roughness={.2}/></mesh></group></group>)}
    <group position={[0,-.43,.18]} ref={gimbal}><mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.29,.038,12,36]}/><meshStandardMaterial color="#d4af37" metalness={.85} roughness={.18}/></mesh><mesh position={[0,-.12,.07]}><sphereGeometry args={[.27,28,18]}/><meshStandardMaterial color="#080808" metalness={1} roughness={.03}/></mesh><mesh position={[0,-.12,.29]}><cylinderGeometry args={[.15,.15,.025,32]}/><meshStandardMaterial color="#1b4e59" emissive="#0d262e" metalness={.95} roughness={.04}/></mesh></group>
    <mesh position={[-.82,-.45,.4]} rotation={[0,0,.26]}><cylinderGeometry args={[.026,.026,.72,10]}/><meshStandardMaterial color="#323232" metalness={.8}/></mesh><mesh position={[.82,-.45,.4]} rotation={[0,0,-.26]}><cylinderGeometry args={[.026,.026,.72,10]}/><meshStandardMaterial color="#323232" metalness={.8}/></mesh>
    <pointLight position={[0,-.32,.8]} color="#d4af37" intensity={5} distance={3}/><pointLight position={[0,.18,-.8]} color="#d9ecef" intensity={2} distance={2}/>
  </group></Float>;
}
export function DroneFlight(){return <div className="drone-flight" aria-hidden="true"><Canvas camera={{position:[0,1.3,7],fov:43}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}}><ambientLight intensity={.5}/><spotLight position={[2,5,4]} intensity={80} color="#d4af37" angle={.45}/><CinemaDrone/><Environment preset="city"/></Canvas></div>}
