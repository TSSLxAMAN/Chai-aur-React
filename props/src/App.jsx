import "./App.css";
import "./components/Card.jsx";
import Card from "./components/Card.jsx";
function App() {
  return (
    <>
      <div className="container mx-auto my-7">
        <h2 className="text-3xl text-center font-semibold py-3 text-white bg-amber-600">
          Most Visited Places
        </h2>
        <div className="grid grid-cols-4 gap-x-6 justify-center items-center ">
          <Card
            link="https://images.pexels.com/photos/28406651/pexels-photo-28406651/free-photo-of-historic-armenian-church-on-akdamar-island-van.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            location_name="Castel of America"
            detail="Some of the oldest castel of human history"
            number="1"
          ></Card>
          <Card
            link="https://images.pexels.com/photos/18862730/pexels-photo-18862730/free-photo-of-frontenac-castel-halloween-ambiance.jpeg?auto=compress&cs=tinysrgb&w=600"
            location_name="Castel of India"
            detail="Some of the oldest castel of human history"
            number="2"
          ></Card>
          <Card
            link="https://images.pexels.com/photos/18862729/pexels-photo-18862729/free-photo-of-parlement-quebec.jpeg?auto=compress&cs=tinysrgb&w=600"
            location_name="Castel of Brazil"
            detail="Some of the oldest castel of human history"
            number="3"
          ></Card>
          <Card
            link="https://images.pexels.com/photos/18862729/pexels-photo-18862729/free-photo-of-parlement-quebec.jpeg?auto=compress&cs=tinysrgb&w=600"
            location_name="Castel of China"
            detail="Some of the oldest castel of human history"
            number="4"
          ></Card>
          <Card
            link="https://images.pexels.com/photos/18862728/pexels-photo-18862728/free-photo-of-man-on-the-pathway.jpeg?auto=compress&cs=tinysrgb&w=600"
            location_name="Castel of South America"
            detail="Some of the oldest castel of human history"
            number="5"
          ></Card>
        </div>
      </div>
    </>
  );
}

export default App;
