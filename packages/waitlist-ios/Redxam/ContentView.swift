//
//  ContentView.swift
//  Redxam
//
//  Created by Priyanka Dadhich on 3/8/22.
//

import SwiftUI


struct ContentView: View {
    static let screenWidth = UIScreen.main.bounds.size.width
    static let screenHeight = UIScreen.main.bounds.size.height
    
    
    var body: some View {
        
        
        
        NavigationView {
            
            ZStack(alignment:.topLeading){
                Image("app_bg")
                    .resizable()
                    
                    .edgesIgnoringSafeArea(.all)
                if UIDevice.current.userInterfaceIdiom == .pad {
                Image("bg_top_right" )
                    .offset(x: ContentView.screenWidth-92, y: 0)

                    .edgesIgnoringSafeArea(.all)
                }
                else{
                    Image("bg_top_right" )
                        .offset(x: ContentView.screenWidth-90, y: 0)

                        .edgesIgnoringSafeArea(.all)
                }

                Image("bg_center_left" )
                    .offset(x: 0, y: ContentView.screenHeight/2)
                    .edgesIgnoringSafeArea(.all)

                if UIDevice.current.userInterfaceIdiom == .pad {
                    // iPad
                    Image("bg_bottom_left" )
                        .offset(x: 0, y: ContentView.screenHeight-180)


                    Image("bg_center_right" )

                        .offset(x: ContentView.screenWidth-115, y: ContentView.screenHeight/2)
                } else {
                    Image("bg_bottom_left_small" )
                        .offset(x: 0, y: ContentView.screenHeight-100)
                }
                
                
                
                
                
                VStack(alignment: .leading) {
                    
                    HStack{
                        if UIDevice.current.userInterfaceIdiom == .pad {
                        Image("logo" )
                            .resizable()
                            .frame(width: 300, height: 70)
                        }
                        else{
                            Image("logo" )
                                .resizable()
                                .frame(width: 135, height: 35)
                                
                        }
                        
                        
                        Spacer()
                        
                    }
                    
                    Spacer()
                    if UIDevice.current.userInterfaceIdiom == .pad {
                        // iPad
                        HStack{
                            VStack(alignment: .leading){
                                HStack(spacing:0.05){
                                    Text("Get ")
                                        .font(Font.custom( "Rubik-Regular", size: 70))
                                    
                                        .foregroundColor(Color.white)
                                        .multilineTextAlignment(.leading)
                                    
                                    Text("ahead ")
                                        .underline()
                                        .font(Font.custom( "Rubik-Bold", size: 70))
                                        .fontWeight(.bold)
                                        .foregroundColor(Color.white)
                                    Text("of ")
                                        .font(Font.custom( "Rubik-Regular", size: 70))
                                    
                                        .foregroundColor(Color.white)
                                    
                                }
                                HStack(spacing:0.05){
                                    Text("the ")
                                        .font(Font.custom( "Rubik-Regular", size: 70))
                                    
                                        .foregroundColor(Color.white)
                                    Text("waitlist")
                                        .font(Font.custom( "Rubik-Bold", size: 70))
                                        .fontWeight(.bold)
                                        .foregroundColor(Color.white)
                                    
                                }
                            }.frame(width: ContentView.screenWidth * 0.7, alignment: .leading)
                            
                            
                            
                            
                            Spacer()
                        }
                    } else {
                        HStack{
                            VStack(alignment: .leading){
                                HStack(spacing:0.05){
                                    Text("Get ")
                                        .font(Font.custom( "Rubik-Regular", size: 40))
                                    
                                        .foregroundColor(Color.white)
                                        .multilineTextAlignment(.leading)
                                    
                                    Text("ahead ")
                                        .underline()
                                        .font(Font.custom( "Rubik-Bold", size: 40))
                                        .fontWeight(.bold)
                                        .foregroundColor(Color.white)
                                    Text("of ")
                                        .font(Font.custom( "Rubik-Regular", size: 40))
                                    
                                        .foregroundColor(Color.white)
                                    
                                }
                                HStack(spacing:0.05){
                                    Text("the ")
                                        .font(Font.custom( "Rubik-Regular", size: 40))
                                    
                                        .foregroundColor(Color.white)
                                    Text("waitlist")
                                        .font(Font.custom( "Rubik-Bold", size: 40))
                                        .fontWeight(.bold)
                                        .foregroundColor(Color.white)
                                    
                                }
                            }.frame(width: ContentView.screenWidth * 0.7, alignment: .leading)
                            
                            
                            
                            
                            Spacer()
                        }
                    }
                    
                    if UIDevice.current.userInterfaceIdiom == .pad {
                        // iPad
                        Text("Move up in the queue by inviting \nyour friends with this link")
                            .font(.custom( "Rubik-Regular", size: 30))
                            .multilineTextAlignment(.leading)
                            .frame(width: 500, alignment: .leading)
                            .foregroundColor(Color.white)
                    } else {
                        Text("Move up in the queue by inviting \nyour friends with this link")
                            .font(.custom( "Rubik-Regular", size: 16))
                            .multilineTextAlignment(.leading)
                            .frame(width: 300, alignment: .leading)
                            .foregroundColor(Color.white)
                        
                    }
                   
                    VStack{
                    
                    //            Button(action: { print("hello") }, label: { Text("Button") })
                    NavigationLink(destination: SignUpScreen().navigationBarBackButtonHidden(true)) {
                        CustomButton(buttonText: "Join the waitlist" )
                            .frame(width: 300)
                            .padding(.top, 10)
                    }
                    
                            BottomView(facebook_img: "facebook_white", twitter_img: "twiter_white", linkedin_img: "linkedin_white", mail_img: "mail_white").frame(width: 300)
                           
                    }.frame(width: ContentView.screenWidth*0.8, alignment: UIDevice.current.userInterfaceIdiom == .pad ? .leading : .center)
                    
                    
                    
                }.frame(width: ContentView.screenWidth*0.8, height: ContentView.screenHeight*0.9)
                    .padding(40)
                
            }.navigationBarHidden(true)
            
        }.navigationViewStyle(StackNavigationViewStyle())
        
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        
            
            ContentView()
//                .previewLayout(.fixed(width: 812, height: 375)) // 1
//                .environment(\.horizontalSizeClass, .compact) // 2
//                .environment(\.verticalSizeClass, .compact) // 3
    }
}
