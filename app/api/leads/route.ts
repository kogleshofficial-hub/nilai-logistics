import {NextResponse} from "next/server";
import {createClient} from "@supabase/supabase-js";
export async function POST(request:Request){
 try{
  const body=await request.json();
  if(!body.name||!body.email||!body.whatsapp||!body.route||!body.cargoType)return NextResponse.json({error:"Please complete the required fields."},{status:400});
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key)return NextResponse.json({error:"Lead capture is not configured yet."},{status:503});
  const supabase=createClient(url,key,{auth:{autoRefreshToken:false,persistSession:false}});
  const {error}=await supabase.from("leads").insert({name:body.name.trim(),email:body.email.trim().toLowerCase(),whatsapp:body.whatsapp.trim(),route:body.route,cargo_type:body.cargoType,quantity:body.quantity??0,quantity_unit:body.quantityUnit??"kg",source:"instant-quote",metadata:{user_agent:request.headers.get("user-agent")}});
  if(error){console.error(error);return NextResponse.json({error:"We could not save the request. Please try again."},{status:500})}
  return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:"Invalid request."},{status:400})}
}