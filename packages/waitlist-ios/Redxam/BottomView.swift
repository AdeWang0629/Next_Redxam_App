//
//  BottomView.swift
//  Redxam
//
//  Created by Priyanka Dadhich on 3/8/22.
//

import SwiftUI

struct BottomView: View {
    @State var facebook_img = ""
    @State var twitter_img = ""
    @State var linkedin_img = ""
    @State var mail_img = ""
    func openUrl() {
        print("openUrl function call")
        
        let appURL = URL(string: "mailto:hello@redxam.com?subject=Hi%20redxam")!

        if #available(iOS 10.0, *) {
            UIApplication.shared.open(appURL, options: [:], completionHandler: nil)
        } else {
            UIApplication.shared.openURL(appURL)
        }
        
    }
    var body: some View {
        HStack(alignment: .center){
            
            Button(action: {
                print("facebool button tapped!")
//                openUrl()
            }) {
                Link(destination: URL(string: "https://www.facebook.com/redxamenglish")!) {
                Image(facebook_img)
                    .resizable()
                    .frame(width: 20, height: 20)
                    
                    .padding()
                }
            }
            
            Button(action: {
                print("twitter button tapped!")
            }) {
                Link(destination: URL(string: "https://twitter.com/redxamapp")!) {
                Image(twitter_img)
                    
                    .resizable()
                    .frame(width: 20, height: 20)
                    .padding()
                }
            }
            
            Button(action: {
                print("linkedin button tapped!")
            }) {
                Link(destination: URL(string: "https://www.linkedin.com/company/redxam")!) {
                Image(linkedin_img)
                    .resizable()
                    .frame(width: 20, height: 20)
                    .padding()
                }
            }
            
            Button(action: {
                print("mail button tapped!")
                openUrl()
            }) {
              
                Image(mail_img)
                    .resizable()
                    .frame(width: 20, height: 20)
                    .padding()
                
            }
        }.padding()
    }
}

struct BottomView_Previews: PreviewProvider {
    static var previews: some View {
        BottomView()
    }
}
