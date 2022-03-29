//
//  BuyScreen.swift
//  Redxam
//
//  Created by Priyanka Dadhich on 3/14/22.
//

import SwiftUI

struct BuyScreen: View {
    static let screenWidth = UIScreen.main.bounds.size.width
      static let screenHeight = UIScreen.main.bounds.size.height
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>

    var body: some View {
        ZStack(alignment:.topLeading) {
                Image("app_bg_card")
                    .resizable()
                    .edgesIgnoringSafeArea(.all)
            if UIDevice.current.userInterfaceIdiom == .pad {
            Image("bg_top_right_gray" )
                .offset(x: ContentView.screenWidth-90, y: 0)

                .edgesIgnoringSafeArea(.all)
            }
            else{
            Image("bg_top_right_gray" )
                .offset(x:  BuyScreen.screenWidth-70, y: 0)
                .edgesIgnoringSafeArea(.all)
            }

            Image("bg_center_left_gray" )
                .offset(x: 0, y: BuyScreen.screenHeight/2)
                .edgesIgnoringSafeArea(.all)

            if UIDevice.current.userInterfaceIdiom == .pad {
                // iPad
                Image("bg_bottom_left_gray" )
                    .offset(x: 0, y: BuyScreen.screenHeight-170)
                    .edgesIgnoringSafeArea(.all)


                Image("bg_center_right_gray" )

                    .offset(x: BuyScreen.screenWidth-120, y: BuyScreen.screenHeight/2)
                    .edgesIgnoringSafeArea(.all)
            } else {
                Image("bg_bottom_left_gray_small" )
                    .offset(x: 10, y: BuyScreen.screenHeight-90)
                    .edgesIgnoringSafeArea(.all)
            }
            
        VStack {
            
            
            HStack{
                if UIDevice.current.userInterfaceIdiom == .pad {
                Image("logo_black" )
                    .resizable()
                    .frame(width: 300, height: 70)
                    .padding(.top, -40)
                }
                else{
                    Image("logo_black" )
                        .resizable()
                        .frame(width: 135, height: 35)
                        .padding(.top, -30)
                        
                }
//                Image("logo_black" )
//                    .resizable()
//                    .frame(width: BuyScreen.screenWidth * 0.3, height: BuyScreen.screenWidth * 0.08)
//                    .padding(.top, -40)
               
                
                Spacer()
                
            }
            Spacer()
            
            ZStack {
//                        Rectangle()
//                            .fill(Color("Background"))
//                            .frame(maxWidth: .infinity, maxHeight: .infinity)
//                            .edgesIgnoringSafeArea(.all)
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color("Background"))
                    .frame(width: UIDevice.current.userInterfaceIdiom == .pad ? 400: 300, height: 170)
                                .shadow(color: Color("Light shadow"), radius: 8, x: -8, y: -8)
                                .shadow(color: Color("Dark shadow"), radius: 8, x: 8, y: 8)
                                .opacity(0.4)
                  
                HStack{
           
                VStack(alignment: .leading){
                    
                    Text("You Are")
                        .font(Font.custom( "Rubik-Regular", size: 16))
                 
                        .foregroundColor(Color.black)
                        .multilineTextAlignment(.leading)
                        .padding(.bottom, 5)
                    HStack(spacing:0.05){
                    Text("12345")
                       .font(Font.custom( "Rubik-Regular", size: 40))
                        .fontWeight(.bold)
                        .foregroundColor(Color.green)
                        .padding(.bottom, 5)
                       
                           
                        Text("TH")
                           .font(Font.custom( "Rubik-Regular", size: 20))
                            .fontWeight(.bold)
                            .foregroundColor(Color.green)
                            .padding(.top)
                        
                    }
                    
                    Text("In Line")
                        .font(Font.custom( "Rubik-Regular", size: 16))
                        .foregroundColor(Color.black)
                        .padding(.bottom, 5)
                       
                   
                
//                    .foregroundColor(.white)
//                    .background(Color.white)
//                    .opacity(0.6)
//                    .shadow(radius: 30)
//
//                    .cornerRadius(30)
            }.frame(width: UIDevice.current.userInterfaceIdiom == .pad ? 400: 300, height: 170)
                    
                
                    VStack{
                   Spacer()
                Image("bg_leaf_green" )
                    .resizable()
                    .frame(width: 40, height: 40)
                    
                    .padding(.leading, -60)
                    .padding(.bottom, 20)
                    }.frame(width: 50, height: 200)
                }
            }.frame(width: UIDevice.current.userInterfaceIdiom == .pad ? 400: 300, height: 170)
                
            Spacer()
            
            if UIDevice.current.userInterfaceIdiom == .pad {
                // iPad
                HStack(alignment: .center){
                    VStack(alignment: .center){
                        HStack(spacing:0.05){
                            Text("Buy ")
                                .font(Font.custom( "Rubik-Regular", size: 50))
                            
                                .foregroundColor(Color.black)
                                .multilineTextAlignment(.leading)
                            
                            Text("$RXM ")
                                .underline()
                                .font(Font.custom( "Rubik-Bold", size: 50))
                                .fontWeight(.bold)
                                .foregroundColor(Color.black)
                            Text("tokens ")
                                .font(Font.custom( "Rubik-Regular", size: 50))
                            
                                .foregroundColor(Color.black)
                            
                        }
                        HStack(spacing:0.05){
                           
                            Text("early.")
                                .font(Font.custom( "Rubik-Bold", size: 50))
                                .fontWeight(.bold)
                                .foregroundColor(Color.black)
                            
                        }
                    }.frame(width: BuyScreen.screenWidth * 0.7, alignment: .center)
                    
                    
                    
                    
                    
                }
            } else {
                HStack{
                    VStack(alignment: .leading){
                        HStack(spacing:0.05){
                            Text("Buy ")
                                .font(Font.custom( "Rubik-Regular", size: 35))
                            
                                .foregroundColor(Color.black)
                                .multilineTextAlignment(.leading)
                            
                            Text("$RXM ")
                                .underline()
                                .font(Font.custom( "Rubik-Bold", size: 35))
                                .fontWeight(.bold)
                                .foregroundColor(Color.black)
                            Text("tokens ")
                                .font(Font.custom( "Rubik-Regular", size: 35))
                            
                                .foregroundColor(Color.black)
                            
                        }
                        HStack(spacing:0.05){
                           
                            Text("early")
                                .font(Font.custom( "Rubik-Bold", size: 35))
                                .fontWeight(.bold)
                                .foregroundColor(Color.black)
                            
                        }
                    }.frame(width: 300, alignment: .leading)
                    
                    
                    
                    
//                    Spacer()
                }
            }
//            HStack{
//                VStack(alignment: .leading){
//                    HStack(spacing:0.05){
//                        Text("Get ")
//                            .font(Font.custom( "Rubik-Regular", size: 30))
//
//                            .foregroundColor(Color.black)
//                            .multilineTextAlignment(.leading)
//
//                        Text("extra ")
//                            .underline()
//                            .font(Font.custom( "Rubik-Bold", size: 30))
//                            .fontWeight(.bold)
//                            .foregroundColor(Color.black)
//                        Text("benefits ")
//                            .font(Font.custom( "Rubik-Regular", size: 30))
//
//                            .foregroundColor(Color.black)
//
//                    }
//                    HStack(spacing:0.05){
//                        Text("by ")
//                            .font(Font.custom( "Rubik-Regular", size: 30))
//
//                            .foregroundColor(Color.black)
//                        Text("referring")
//                            .font(Font.custom( "Rubik-Bold", size: 30))
//                            .fontWeight(.bold)
//                            .foregroundColor(Color.black)
//
//                    }
//                }.frame(width: ContentView.screenWidth*0.8, alignment: .leading)
//
//
//
//
//
//            Spacer()
//            }
////            Text("Get extra benefits by referring")
////                .font(.title)
////                .fontWeight(.bold)
////                .foregroundColor(Color.black)
////                .padding(.horizontal, 40)
            ///
    
            if UIDevice.current.userInterfaceIdiom == .pad {
                // iPad
                Text("Holding tokens will give you access \nthe redxam earlier!")
                    .font(.custom( "Rubik-Regular", size: 30))
                    .multilineTextAlignment(.center)
                    .frame(width: 500, alignment: .center)
                    .foregroundColor(Color.black)
            } else {
                Text("Holding tokens will give you access \nthe redxam earlier!")
                    .font(.custom( "Rubik-Regular", size: 16))
                    .multilineTextAlignment(.leading)
                    .frame(width: 300, alignment: .leading)
                    .foregroundColor(Color.black)
                
            }
                
//            Text("Move up in the queue by inviting \nyour friends with this link")
//                .font(.custom( "Rubik-Regular", size: 16))
//
//                .multilineTextAlignment(.leading)
//                .frame(width: ContentView.screenWidth*0.8, alignment: .leading)
//                .foregroundColor(Color.gray)
            
//            Button(action: { print("hello") }, label: { Text("Button") })
            
         
            
            Button(action: {
                print("button tapped")
            }){
                HStack {
                    
                    Text("Buy $RXM")
                        .font(.custom( "Rubik-Regular", size: 14))
                        .multilineTextAlignment(.leading)
                        .frame(minWidth: 0, maxWidth: .infinity)
                   
                    
                }.padding()
                    .frame(width: 300)
                    .padding(.top, 10)
                    .foregroundColor(.white)
                    .background(Color.green)
                    .cornerRadius(15)
                    
                

            }.padding(.horizontal, 20)
                .padding(.top, 20)
            
           
            BottomView(facebook_img: "facebook_green", twitter_img: "twiter_green", linkedin_img: "linkedin_green", mail_img: "mail_green").padding(40)
               
           
            
        }.frame(width: BuyScreen.screenWidth*0.9, height: BuyScreen.screenHeight*0.8)
                .padding(40)
        }
        .edgesIgnoringSafeArea(.bottom)
        // Hide the system back button
        .navigationBarBackButtonHidden(true)
        // Add your custom back button here
//        .navigationBarItems(leading:
//            Button(action: {
//                self.presentationMode.wrappedValue.dismiss()
//            }) {
//                HStack {
//                    Image(systemName: "arrow.left").foregroundColor(.green)
//
//                }
//        })
    }
    }


struct BuyScreen_Previews: PreviewProvider {
    static var previews: some View {
        BuyScreen()
    }
}
