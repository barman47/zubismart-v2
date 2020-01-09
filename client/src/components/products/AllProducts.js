// import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import { getProducts } from '../../actions/productsActions';

// class AllProducts extends Component {
//     constructor (props) {
//         this.state = {
//             products: []
//         };
//     }

//     componentDidMount () {
//         this.props.getProducts();
//     }
//     render () {
//         <h1>All Products</h1>
//     }
// }

// const mapStateToProps = state => ({
//     products: state.products
// });

// AllProducts.propTypes = {
//     getProducts: PropTypes.func.isRequired
// };

// export default connect(mapStateToProps, { getProducts })(AllProducts);