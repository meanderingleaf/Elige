let cards = [
    { name: "a", motivation: 1, skill: 1 },
    { name: "b", motivation: 3, skill: -1 },
    { name: "c", motivation: -1, skill: 4 }
  ];
  
  let eventCards = [
    { name: "Emerald", motivation: 3, skill: 4 },
  ];
  
  class Game extends React.Component {
    
    constructor(props) {
      // Required step: always call the parent class' constructor
      super(props);
  
      // Set the state directly. Use props if necessary.
      this.state = {
        cards: cards,
        eventCards: eventCards
      } 
    }
    
    render() {
      return (
        <div className="game">
          {
            this.state.cards.map((card,ind) => {
              return <Card data={card} key={ind} id={ind} onAction={() => { this.actionDone() }} />;
            })
          }
          
          {
             this.state.eventCards.map((card,ind) => {
              return <Card data={card} key={ind} id={ind} onAction={(id) => { this.actionDone(id) }} />;
            })
          }
        </div>
      );
    }
    
    actionDone(id) {
      console.log(id);
      this.setState({
        cards: this.state.cards.filter((_, i) => i !== id)
      })
    }
  }
  
  class Card extends React.Component {
    
    constructor(props) {
      // Required step: always call the parent class' constructor
      super(props);
      
      // Set the state directly. Use props if necessary.
      this.state = {
        motivation: this.props.data.motivation,
        skill: this.props.data.skill,
        animState: "settled"
      }
    }
    
    render() {
      return (
        <div  className={"card " + this.state.animState}
              draggable
              onDragStart={(e) => { this.dragstart(e)}}
              onDrop={(e) => { this.handleDrop(e) }}
              onDragOver={(e) => { e.preventDefault() }}
              >
          {this.props.data.name} <br />
          M: {this.state.motivation} <br />
          S: {this.state.skill}
        </div>
      );
    }
    
    handleDrop(event, targ) {
      let motiv = Number(event.dataTransfer.getData("motivation"));
      let skill = Number(event.dataTransfer.getData("skill"));
      let id = Number(event.dataTransfer.getData("cid"));
      
      this.props.onAction(id);
      
      this.setState({
        motivation: this.state.motivation + motiv,
        skill: this.state.skill + skill,
        animState: "inMotion"
      })
      
    }
    
    dragstart(event) {
      event.dataTransfer.setData("motivation",this.state.motivation);
      event.dataTransfer.setData("skill",this.state.motivation);
      event.dataTransfer.setData("cid",this.props.id); 
    }
  }
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  