import React from 'react';
import { Diamond, Wallet, Percent } from 'lucide-react';
import Image from 'next/image';


const WhyUs = () => {
  return (
    <div className="py-16">
      <div className="max-w-[1550px] mx-auto px-5 md:px-10 lg:px-20">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 font-['The-Last-Shuriken']">WHY CODE PROJEKT</h2>
        
        <p className="mb-12 max-w-6xl text-lg leading-tight">
          Hundreds of gamers count on codeprojekt every month for a seamless purchase experience when buying game credits or vouchers. 
          Purchases are added to your game account instantly. mlbb mobile, and more coming soon!
        </p>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Easy and Fast */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Image src="/hand.png" alt="Logo" width={40} height={40} />
            </div>
            <div>
              <h3 className="text-xl ">EASY AND FAST</h3>
              <p className="-mt-0.5 leading-tight ">
                It only takes a few seconds to complete a purchase on codepro
              </p>
            </div>
          </div>

          {/* Instant Delivery */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Diamond size={36} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl ">INSTANT DELIVERY</h3>
              <p className="-mt-0.5 leading-tight">
                When you top-up on Codashop, your purchase is delivered directly to your game account as soon as your payment is complete.
              </p>
            </div>
          </div>

          {/* Convenient Payment Methods */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Wallet size={36} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl ">CONVENIENT PAYMENT METHODS</h3>
              <p className="-mt-0.5 leading-tight">
                To ensure your convenience, we have partnered with the most popular providers in India.
              </p>
            </div>
          </div>

          {/* Customer Support */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
            <Image src="/headphones.png" alt="Logo" width={40} height={40} />
            </div>
            <div>
              <h3 className="text-xl ">CUSTOMER SUPPORT</h3>
              <p className="-mt-0.5 leading-tight">
                Our friendly customer support team is always available to assist you. contact us
              </p>
            </div>
          </div>

          {/* Exciting Promotions */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <Percent size={36} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl ">EXCITING PROMOTIONS</h3>
              <p className="-mt-0.5 leading-tight">
                Keep a lookout for the best/free diamonds deals for your favorite games at codeprojekt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;