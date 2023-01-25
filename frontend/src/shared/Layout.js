import React from 'react';
// import Header from '../components/Header';

function Layout({ children }) {
    return (
        <div>
            {/* <Header/> */}
            <div>
                {children}
            </div>
            {/* <div>푸터부분</div> */}
        </div>
    );
}

export default Layout;