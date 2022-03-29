//
//  SignUpScreen.swift
//  Redxam
//
//  Created by Priyanka Dadhich on 3/8/22.
//

import SwiftUI



struct SignUpScreen: View {
    @State var isHideLoader: Bool = false
    
    static let screenWidth = UIScreen.main.bounds.size.width
    static let screenHeight = UIScreen.main.bounds.size.height
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    
    @State private var showingAlert = false
    @State private var messageAlert = ""
    
    @State var first_name_text: String = ""
    @State var last_name_text: String = ""
    @State var email_text: String = ""
    
    @State var pushActive = false
    
    func loadData(first_name: String, last_name: String, email: String ) {
        
        
        
        let parameters = "{\"query\":\"mutation {\\n        createWaitlist(arg: {\\n          email: \\\"\(email)\\\",\\n          firstName: \\\"\(first_name)\\\",\\n          lastName: \\\"\(last_name)\\\",\\n          referralCode:  \\\"\\\"\\n        }) {\\n            success\\n            message\\n        }\\n    }\",\"variables\":{}}"
        let postData = parameters.data(using: .utf8)
        
        print("parameters======>\(parameters)")
        
        print("postData======>\(postData)")
        
        var request = URLRequest(url: URL(string: "https://api.redxam.com/api/v1")!,timeoutInterval: Double.infinity)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        request.httpMethod = "POST"
        request.httpBody = postData
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data else {
                print(String(describing: error))
                
                return
            }
            print(String(data: data, encoding: .utf8)!)
            
            let createWaitlist = try! JSONDecoder().decode(DataObject.self, from: data)
            print(createWaitlist.data.createWaitlist.success)
            
            var successData = createWaitlist.data.createWaitlist.success
            
            if (successData){
                self.pushActive = true
            }
            else{
                showingAlert = true
                messageAlert = createWaitlist.data.createWaitlist.message
            }
            
            //            let successData = try! JSONDecoder().decode(TaskEntry.self, from: createWaitlist.createWaitlist)
            //                        print(successData)
            
            
        }
        
        task.resume()
        
    }
    
    struct DataObject: Codable {
        
        public var data: CreateWaitlistObject
    }
    
    struct CreateWaitlistObject: Codable {
        
        public var createWaitlist: ResultObject
    }
    
    struct ResultObject: Codable {
        public var success: Bool
        public var message: String
    }
    
    
    
    var body: some View {
       
        
       
        
        ZStack(alignment:.topLeading) {
            Image("app_bg_color")
                .resizable()
                .edgesIgnoringSafeArea(.all)
            if UIDevice.current.userInterfaceIdiom == .pad {
            Image("bg_top_right" )
                .offset(x: ContentView.screenWidth-90, y: 0)

                .edgesIgnoringSafeArea(.all)
            }
            else{
            Image("bg_top_right" )
                .offset(x: ContentView.screenWidth-70, y: 0)

                .edgesIgnoringSafeArea(.all)
            }

            Image("bg_center_left" )
                .offset(x: 0, y: ContentView.screenHeight/2)
                .edgesIgnoringSafeArea(.all)

            if UIDevice.current.userInterfaceIdiom == .pad {
                // iPad
                Image("bg_bottom_left" )
                    .offset(x: 0, y: ContentView.screenHeight-160)
                    .edgesIgnoringSafeArea(.all)

                Image("bg_center_right" )

                    .offset(x: ContentView.screenWidth-115, y: ContentView.screenHeight/2)
                    .edgesIgnoringSafeArea(.all)
            } else {
                Image("bg_bottom_left_small" )
                    .offset(x: 20, y: ContentView.screenHeight-90)
                    .edgesIgnoringSafeArea(.all)
            }
            
           
           
            
            
            VStack(alignment: .leading) {
               
                VStack{
                    
                    
                    
                    HStack{
                        if UIDevice.current.userInterfaceIdiom == .pad {
                        Image("logo" )
                            .resizable()
                            .frame(width: 300, height: 70)
                            .padding(.top, -40)
                        }
                        else{
                            Image("logo" )
                                .resizable()
                                .frame(width: 135, height: 35)
                                .padding(.top, -15)
                                
                        }
//                        Image("logo" )
//                            .resizable()
//                            .frame(width: ContentView.screenWidth * 0.3, height: ContentView.screenWidth * 0.08)
//                            .padding(.top, -40)
//
                        
                        Spacer()
                        
                    }
                    
                    
                    Spacer()
                    
                    VStack{
                        Spacer()
                        
                        if UIDevice.current.userInterfaceIdiom == .pad {
                            Text("Join the waitlist")
                                .font(Font.custom( "Rubik-Regular", size: 40))
                                .fontWeight(.bold)
                                .foregroundColor(Color.white).padding()
                        } else {
                            Text("Join the waitlist")
                                .font(Font.custom( "Rubik-Regular", size: 22))
                                .fontWeight(.bold)
                                .foregroundColor(Color.white).padding()
                        }
                        
                        
                        if UIDevice.current.userInterfaceIdiom == .pad {
                            // iPad
                            Text("Sign up for alpha and be the first to be notified when we launch")
                            
                                .font(Font.custom( "Rubik-Regular", size: 25))
                                .multilineTextAlignment(.center)
                                .padding(.horizontal, 15)
                            
                                .foregroundColor(Color.white)
                        } else {
                            Text("Sign up for alpha and be the first to be notified when we launch")
                            
                                .font(Font.custom( "Rubik-Regular", size: 15))
                                .multilineTextAlignment(.center)
                                .padding(.horizontal, 15)
                            
                                .foregroundColor(Color.white)
                        }
                        
                        
                        TextField("First Name", text: $first_name_text)
                            .textContentType(.givenName)
                            .padding(.leading, 20)
                            .frame( height: 38)
                            .font(Font.custom( "Rubik-Regular", size: 18))
                            .padding(10)
                            .background(RoundedRectangle(cornerRadius: 30).fill(Color(red: 255/255, green: 255/255, blue: 255/255))) // Here!!
                            .foregroundColor(.black)
                            .padding(.horizontal, 20)
                            .padding(.vertical, 15)
                        
                        
                        
                        TextField("Last Name", text: $last_name_text)
                            .textContentType(.familyName)
                            .padding(.leading, 20)
                            .frame( height: 38)
                        
                            .font(Font.custom( "Rubik-Regular", size: 18))
                            .padding(10)
                        
                            .background(RoundedRectangle(cornerRadius: 30).fill(Color(red: 255/255, green: 255/255, blue: 255/255))) // Here!!
                            .foregroundColor(.black)
                            .padding(.horizontal, 20)
                            .padding(.bottom, 15)
                        
                        TextField("Email", text: $email_text)
                            .textContentType(.emailAddress)
                            .padding(.leading, 20)
                            .frame( height: 38)
                            .font(Font.custom( "Rubik-Regular", size: 18))
                            .padding(10)
                            .background(RoundedRectangle(cornerRadius: 30).fill(Color(red: 255/255, green: 255/255, blue: 255/255))) // Here!!
                            .foregroundColor(.black)
                            .padding(.horizontal, 20)
                            .padding(.bottom, 5)
                        
                        NavigationLink(destination: ReferalScreen().navigationBarBackButtonHidden(true), isActive: self.$pushActive) {
                        GeometryReader { gp in
                            CustomButton(buttonText: "Sign Up!")
                                .padding()
                            
                        }.onTapGesture {
                            // change state closing any dropdown here
                            print("sign up button tapped")
                           
                            
                            if(first_name_text == ""){
                                showingAlert = true
                                messageAlert = "Fill First Name"
                            }
                            else if(last_name_text == ""){
                                showingAlert = true
                                messageAlert = "Fill Last Name"
                            }
                            else if(email_text == ""){
                                showingAlert = true
                                messageAlert = "Fill Email"
                            }
                            else{
                                self.isHideLoader = false
                                
                                loadData(first_name: first_name_text, last_name: last_name_text, email: email_text)
                            }
                        }
                        }.navigationBarBackButtonHidden(true)
                    }.frame(width: UIDevice.current.userInterfaceIdiom == .pad ? 500 : 320 , height: ContentView.screenHeight*0.6)
                    
                   
                        BottomView(facebook_img: "facebook_white", twitter_img: "twiter_white", linkedin_img: "linkedin_white", mail_img: "mail_white").padding(40)
                        
                   
                    
                    
                }
                
                
                
            }.frame(width: ContentView.screenWidth*0.9, height: ContentView.screenHeight*0.9)
                .padding(40)
//            LoaderView(tintColor: .red, scaleSize: 3.0)
//                .offset(x: ContentView.screenWidth/2, y: ContentView.screenHeight/2)
//                .padding(.bottom,50).hidden(isHideLoader)
        }
        
        .edgesIgnoringSafeArea(.bottom)
        // Hide the system back button
        .navigationBarBackButtonHidden(true)
        // Add your custom back button here
//        .navigationBarItems(leading:
//                                Button(action: {
//            self.presentationMode.wrappedValue.dismiss()
//        }) {
//            HStack {
//                Image(systemName: "arrow.left").foregroundColor(.white)
//                
//            }
//        })
        .alert(messageAlert, isPresented: $showingAlert) {
            Button("OK", role: .cancel) { }
        }
        
    }
    
}

struct SignUpScreen_Previews: PreviewProvider {
    static var previews: some View {
        SignUpScreen()
    }
}

struct LoaderView: View {
    var tintColor: Color = .blue
    var scaleSize: CGFloat = 1.0
    
    var body: some View {
        ProgressView()
            .scaleEffect(scaleSize, anchor: .center)
            .progressViewStyle(CircularProgressViewStyle(tint: tintColor))
    }
}

extension View {
    @ViewBuilder func hidden(_ shouldHide: Bool) -> some View {
        switch shouldHide {
        case true: self.hidden()
        case false: self
        }
    }
}
