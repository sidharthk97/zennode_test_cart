$(document).ready(function(){

    $('.quantity-right-plus').click(function(e){
            
            // Stop acting like a button
            e.preventDefault();

            var kq = $(this).parent().siblings(".quantity");
            var quantity = parseInt(kq.val());
                
            kq.val(quantity + 1);
                // Incrementing quantity   
                
            qty = parseInt(kq.val());  
            kp =  $(this).parent().parent().parent().parent().siblings("h2").find('.price')
            var price = parseInt(kp.html());

            //calculating total amount of the product
            var full_price = qty*price;
            kfp =  $(this).parent().parent().parent().parent().siblings("h2").find('.full-price')
            kfp.html(full_price);
            
            
            changeTotal();
    });
    
    $('.quantity-left-minus').click(function(e){
            // Stops acting like a button
            e.preventDefault();

            var kq = $(this).parent().siblings(".quantity");
            var quantity = parseInt(kq.val());

                // Decrementing the quantity
            if(quantity>0)
            {
                kq.val(quantity - 1);
            }

            qty = parseInt(kq.val());  
            kp =  $(this).parent().parent().parent().parent().siblings("h2").find('.price')
            var price = parseInt(kp.html());

            //calculating total amount of the product
            var full_price = qty*price;
            kfp =  $(this).parent().parent().parent().parent().siblings("h2").find('.full-price')
            kfp.html(full_price);

            changeTotal();

    });

    changeTotal();
       
});

function changeTotal() {
  
    var price = 0;
    var unit_count = 0;
    var gift_count = 0;
    var disc_sum = 0;
    var discount1_name = "flat_10_discount";
    var discount1_amount = 0 ;
    var discount2_name = "bulk_5_discount";
    var discount2_amount = 0 ;
    var discount3_name = "bulk_10_discount";
    var discount3_amount = 0 ;
    var discount4_name = "tiered_50_discount";
    var discount4_amount = 0 ;
    
    
    $(".full-price").each(function(index){
      price += parseFloat($(".full-price").eq(index).html());
    });

    $(".quantity").each(function(index){
     
        var qc = parseInt($(".quantity").eq(index).val());
        unit_count += qc
        if(qc > 10)
        {
          var qp = $(".quantity").parent().parent().parent().siblings("h2").find('.full-price');
          
          disc_sum = disc_sum + parseFloat(qp.eq(index).html());
          discount2_name = "bulk_5_discount";
          discount2_amount = 0.05 * disc_sum ;
        }



        var qq = $(".quantity").eq(index).parent().parent().parent().siblings('.gift_tick')
        if (qq.is(':checked')) 
        {
            gift_count = gift_count + qc;
            var gift_fee = gift_count * 1;
            $(".gift_fee").html(gift_fee);
            
        }
        
      });

    
    if(price == 0) {
      fullPrice = 0;
    }

    if(price > 200 )
    {
        discount1_name = "flat_10_discount";
        discount1_amount = 10 ;
    }
    if(unit_count > 20)
    {
        discount3_name = "bulk_10_discount";
        discount3_amount = 0.1*price ;
    }
    
    var gift_fee = gift_count * 1;
    $(".gift_fee").html(gift_fee);

    var pack = Math.ceil(unit_count/10);
    var pack_fee = pack*5;
    $(".shipping").html(pack_fee);    
   
    $(".subtotal").html(price);
    $(".count").html(unit_count);

    // for 4th discount calculation, we again use the looping
    var qc_flag = false;
    if(unit_count > 30)
    {
      $(".quantity").each(function(index){
     
        var qc = parseInt($(".quantity").eq(index).val());
         
        if((qc > 15) && (qc_flag == false))
        {
          discount4_name = "tiered_50_discount";
          var qp = $(".quantity").parent().parent().parent().siblings("h2").find('.full-price');
          var fp = parseFloat(qp.eq(index).html());
          discount4_amount = 0.5 * fp ;
          qc_flag = true;
        }
      });

    }
    
    if((discount1_amount > discount2_amount) && (discount1_amount > discount3_amount) && (discount1_amount > discount4_amount))
    {
      $(".discount_name").html(discount1_name);
      $(".discount_amount").html(discount1_amount);

    }
    else if((discount2_amount > discount1_amount) && (discount2_amount > discount3_amount) && (discount2_amount > discount4_amount))
    {
      $(".discount_name").html(discount2_name);
      $(".discount_amount").html(discount2_amount);
    }
    else if((discount3_amount > discount1_amount) && (discount3_amount > discount2_amount) && (discount3_amount > discount4_amount))
    {
      $(".discount_name").html(discount3_name);
      $(".discount_amount").html(discount3_amount);
    }
    else if((discount4_amount > discount1_amount) && (discount4_amount > discount2_amount) && (discount4_amount > discount3_amount))
    {
      $(".discount_name").html(discount4_name);
      $(".discount_amount").html(discount4_amount);
    }
    else{
      $(".discount_name").html("");
      $(".discount_amount").html(0);
    }


    var total = price + gift_fee + pack_fee - parseFloat($(".discount_amount").html());
    $(".total").html(total);

  }