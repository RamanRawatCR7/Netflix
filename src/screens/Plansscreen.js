import React, { useEffect, useState } from 'react'
import "./Plansscreen.css"
import db from "../Firebase"
import { collection, where, query, getDocs, onSnapshot, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice'
import { loadStripe } from '@stripe/stripe-js';
import { stripeconfig } from '../firebaseconfig';

function Plansscreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, `customers/${user.uid}/subscriptions`));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start: subscription.data().current_period_start.seconds,
        })
      })
    }
    fetchData();
  }, [user.uid]);

  useEffect(() => {
    const fetchData = async () => {

      const q = query(collection(db, 'products'), where('active', '==', true))

      const querySnapshot = await getDocs(q);
      const products = {};
      querySnapshot.forEach(async (doc) => {
        products[doc.id] = doc.data();
        const priceSnap = await getDocs(collection(doc.ref, 'prices'));
        priceSnap.docs.forEach((price) => {
          products[doc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);

    }
    fetchData();

  }, [])


  const loadCheckout = async (priceId) => {

    const docRef = await addDoc(collection(db, `customers/${user.uid}/checkout_sessions`), {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(stripeconfig.publicKey)
        stripe.redirectToCheckout({ sessionId })
      }
    })
  };

  const date = new Date(subscription?.current_period_end * 1000).toLocaleDateString();

  return (
    <div className='plansscreen'>
      <br />
      {subscription && <p>Renewal date: {date}</p>}
      {Object.entries(products).map(([productId, productData]) => {

        const isCurrentPackage = productData.name
          .includes(subscription?.role);
        return (
          <div key={productId} className={`${isCurrentPackage && "plansscreen_plan-disabled"} plansscreen_plan`}>
            <div className='plansscreen_info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData.prices.priceId)}>
              {isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Plansscreen