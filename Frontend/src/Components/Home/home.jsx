import React from "react";
import './home.css'
function Home()
{
return(<div className="homecontent">
        <center>
            <h1 className="topic">Welcome to BidBattle!</h1>
        </center>
      
        <div className="firstcontent">
            <pre>           Discover a world of unique items, collectibles, and unbeatable deals. Whether you're a <br /> 
            seasoned bidder or a first-time visitor, our platform offers an exciting way to buy and sell. Explore a <br />
             wide range of categories, from antiques and art to electronics and fashion. Bid confidently with our <br />
             secure platform, transparent process, and dedicated support.</pre> 
        </div>
         <ul> 
            <li>Diverse Selection: Find rare items and new products updated daily.</li>
            <li>User-Friendly Platform: Simple bidding, buying, and selling for all.</li>
            <li>Trusted Sellers: Verified users ensure a safe and reliable experience.</li>
            <li>Competitive Prices: Start bidding at prices you can afford.</li>
        </ul>
        <b></b>

<p>Join our community of auction enthusiasts and start winning great deals today!</p>
<b></b>
<p className="hometerm">
    Here's how it typically works:
    <h4>1.Agreement on Terms</h4>
        <ul className="termslist">
            <li>
                 The buyer and seller agree on the terms of the sale, including the product's
                 price, condition, and any other specific conditions (e.g., shipping time, return policy).
            </li>
        </ul>
    <h4>2. Buyer Makes Payment to Escrow</h4>
        <ul className="termslist"> 
            <li>
                Instead of paying the seller directly, the buyer sends the payment to
                 the escrow service associated with the e-selling platform. This payment
                  is held by the escrow service,not released to the seller immediately.
            </li>
             <li>
                The escrow service confirms receipt of the payment to both parties, 
                indicating the funds are securely held.
            </li>
        </ul>
    <h4>3. Seller Ships the Product</h4>
        <ul className="termslist">
            <li>
                After the escrow service confirms that the payment is secured, 
                the seller ships the product to the buyer.
            </li>
           <li>
                The seller typically provides tracking information to both the buyer
                and the escrow service to ensure transparency in the delivery process.
             </li>
        </ul>
    <h4>4. Buyer Receives and Inspects the Product</h4>
        <ul className="termslist">
            <li>
                Once the buyer receives the product, they are given a specified inspection period 
                (determined by the platform's policies)to check the item and ensure it meets the agreed-upon terms.
            </li>
            <li>
                If the buyer is satisfied with the product, they notify the 
                escrow service to release the funds to the seller.
            </li>
        </ul>
    <h4>5. Release of Funds to Seller</h4>
        <ul className="termslist">
           <li>Upon confirmation from the buyer that the product is satisfactory, the escrow service
             releases the payment to the seller.The transaction is then considered complete.</li> 
        </ul>
</p>
  </div>)
}
export default Home;