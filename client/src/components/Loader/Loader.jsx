import React from 'react'
import './Loader.css'
import { Blocks } from  'react-loader-spinner'
export default function Loader() {
  return (
    <div className='containerBack'>
        <div className='containerLoader'>
            <div className='sabias'>
                <h1 className='cargando'>LOADING</h1>
                <div className='loader'>
                    <Blocks
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                    />
                </div>
                
                <h2>Estamos extrayendo los datos...</h2>
            </div>
        </div>
    </div>
  )
}
