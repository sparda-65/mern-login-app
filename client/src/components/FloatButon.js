import React from 'react'

const FloatButon = ({onClick}) => {
    return (
        <div style={{ position: "fixed", bottom: 40, right: 40 }}>
            <div style={{
                borderRadius: 50, 
                width: 50,
                height: 50,
                background: '#3972F5',
                display:'flex',
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                color:'#ffff',
                boxShadow:'2px 2px 3px #999'
            }}
            onClick={onClick}
            >
                <i className='fa fa-plus'></i>
            </div>
        </div>
    )
}

export { FloatButon }

