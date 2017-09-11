import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Search from './../components/Search';

const Home = props => (
    <div>
        <Search onSubmit={() => { console.log('in'); } } />
        <h1>Home</h1>
        <p>Welcome home!</p>
        <button onClick={() => props.changePage()}>Go to about page via redux</button>

    </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/favorites')
}, dispatch)

const mapStateToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
