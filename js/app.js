// const Hello = props => <h1>Hello {props.name}</h1>;

// const Title = props => <h1 className="tc">{props.title}</h1>;

// const Banner = props => (
//     <h1 className="tc f1 yellow pa3">
//         Hello {props.firstName} {props.surname}
//     </h1>
// );

// const App = () => (
//     <div>
//         <Title title="Welcoe to my website!"/>
//         <Banner firstName="Marta" surname="Font" />
//     </div>
// );

const Highlight = ({color, children}) =>(
    <span className={`relative highlight highlight-${color}`}>
    <span className="relative z-2"> {children} </span>
    </span>
    );  
    
    
    const Intro = () => (
    <div className='m-auto-ns f4 f3-m f2-l tc w-80-l normal'>
        <div className='mb3 mb4-ns'>
        <Highlight color='aqua'>Lost i Tokyo </Highlight>is a directory of fun places to see,
        play in and <Highlight color='yellow'>explore</Highlight>, in <Highlight color='blue'>Tokyo</Highlight>, Japan. 
        </div>
        <div>From <Highlight color='blue'>museums</Highlight> and <Highlight color='pink'>galeries</Highlight>, to <Highlight color='pink'>robot restaurants</Highlight>
        and <Highlight color='pink'>kitten cafes</Highlight>, Tokyo is the gift that keeps on giving.
        <Highlight color='yellow'>Dattebayo!</Highlight> {' '}
        </div>    
    </div>
    );
    
    // const menu = ['About', 'Tickets', 'Logo', 'Journal', 'Contact'];
    
    //the ({ className, href, children }) grabs our properties directly
    //it means we don't have to type out props.className, props.href etc
    const NavItem = ({ className, href, children, logo }) => (
        <li className={`mh2-ns f6 f4-l tc ${className}`}>
        <a className="white no-underline" href="{href}">
            {/* here we check for the logo property, if we have it  we render out our logo
            if not we render out our regulat navigation text {children porp} */}
            {logo ? <img src="../images/logo.svg" className="db center logo" /> : 
            children}
        </a>
    </li>
    )

    const Nav = () => (
    <nav className='pt3 pt4-ns mb4 mb0-ns'>
        <ul className='list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0'>
        {menu.map(item => 
       <NavItem {...item}/>
            )}
        </ul>
    </nav>
    );

    const Overlay = ({title, description, showInfo}) => (
        <div 
        className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-aqua overlay"
        //we do a test to see whether our showInfo state is true
        //if it is, we change the transform to be none, otherwise -100%
        style={{transform: showInfo ? 'none' : 'translateY(-100%)'}}
    >
        <div>
            <h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">
                {title}</h1>
            <p className="lh-title lh-copy-ns mv0 black f6 measure-l"> 
            {description}</p>
        </div>
    </div>
    );

    // we can also create components as classes
    //these give us a more advanced functionality and features
    //such as the component lifecycle as well as the react  state

    class Attraction extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
              showInfo: false
            };
            //here we tell our toggle info about this by using bind
            //otherwise things like setState will not work
            this.toggleInfo = this.toggleInfo.bind(this);
            this.closeInfo = this.closeInfo.bind(this);
        }

        //this is our own method

        toggleInfo() {
            this.setState((prevState, props) => ({
             //here we invert our show info the previous state
             //and the exclamation mark
              showInfo: !prevState.showInfo
            }));
          }

       
            //here we use setState the usual way 
            //because we don't need access to the previous state
            //we are just force setting the showInfo to br true
        closeInfo() {
            this.setState((prevState, props) => ({
              showInfo: false
            }));
          }

        render() {
           return (
                <div 
                className= {`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer attraction ${
                        this.props.className
                    }`}
                    // onClick={()=> alert('clicked!')}
                    onClick={this.toggleInfo}
                    //this runs when our mouse leaves the attraction element
                    onMouseLeave={this.closeInfo}
                     >
                     <div className="relative">
                        {/* here we remember to pass along all of our props and state */}
                        <Overlay {...this.props} {...this.state} />
                        <img src={`../images/${this.props.image}`} className="db" />
                    </div>
                </div>
            );
        }
    }

    const App = () => (
        <div>
            <div className="min-vh-100 ph4 flex flex-column">
                {/*our navigation component*/}
                <Nav />
                <Intro />
            </div>
            <div className="flex flex-wrap container">
                {/* our attractios list component */}
                {attractions.map(attraction =>
                <Attraction {...attraction} /> )}
            </div>
        </div>  
    );
    
    ReactDOM.render(<App />, document.getElementById('root'));
    