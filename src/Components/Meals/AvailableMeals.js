import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {

    const [Meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState('');
    
    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://react-http-a7870-default-rtdb.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error(`Something went wrong , state:${response.status}`)
            }
            const data = await response.json();
            let localMeals = []
            for (const key in data) {
                localMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                })
            }
            setIsLoading(false);
            setMeals(localMeals);
        }
        fetchMeals().catch(Exception => {
            setIsLoading(false);
            setHttpError(Exception.message)
        })

    }, []);
    const MealItems = Meals.map((meal, idx) => {
        return <MealItem name={meal.name} description={meal.description} price={meal.price} key={meal.id} id={meal.id} />
    });

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Is Loading ...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        );
    }
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {
                        MealItems
                    }
                </ul>
            </Card>

        </section>
    );
}

export default AvailableMeals;