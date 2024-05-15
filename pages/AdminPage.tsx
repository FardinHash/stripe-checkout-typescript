import React, { useState } from 'react';
import { Button } from '@mui/material';
import { generateCoupon } from '@/actions/single-cp';
import { generateCoupons } from '@/actions/bulk-cp'; 

interface Coupon {
    id: string;
    name: string;
}

const AdminPage: React.FC = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    const handleGenerateCoupon = async () => {
        try {
            const coupon = await generateCoupon();
            setCoupons([coupon]);
        } catch (error) {
            console.error('Error generating coupon:', error);
        }
    };

    const handleGenerateBulkCoupons = async () => {
        try {
            const generatedCoupons = await generateCoupons(5); 
            setCoupons(generatedCoupons);
        } catch (error) {
            console.error('Error generating bulk coupons:', error);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleGenerateCoupon}>Generate Coupon</Button>
            <Button variant="contained" onClick={handleGenerateBulkCoupons}>Generate Bulk Coupons</Button>
            <div>
                <h2>Coupons</h2>
                <pre>{JSON.stringify(coupons, null, 2)}</pre>
            </div>
        </div>
    );
};

export default AdminPage;