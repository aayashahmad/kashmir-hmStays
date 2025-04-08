export function getFinalPackagePrice(pack) {

    let price = pack.price;
    let discount = pack.discount ? pack.discount : 0;
    let discountType = pack.discount_type ? pack.discount_type : "percentage";
    if (discountType === 'percentage') {
        const discountAmount = (price * discount) / 100;
        return price - discountAmount;
    } else if (discountType === 'amount') {
        return price - discount;
    } else {
        throw new Error('Invalid discount type');
    }
}