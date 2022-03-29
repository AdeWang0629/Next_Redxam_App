//
//  CustomButton.swift
//  Redxam
//
//  Created by Priyanka Dadhich on 3/8/22.
//

import SwiftUI

struct CustomButton: View {
    @State var buttonText = ""
//    @State var nextScreen: View
    var body: some View {
     
        
       
            HStack {
                Text(self.buttonText)
                    .font(Font.custom( "Rubik-Regular", size: 14))
                    .frame(minWidth: 0, maxWidth: .infinity)
            }.padding()
                .foregroundColor(.white)
                .background(Color.black)
                .cornerRadius(40)
            

        
        
        }
}

struct CustomButton_Previews: PreviewProvider {
    static var previews: some View {
        CustomButton()
    }
}


//let action: () -> Void
//    let label: () -> Content
//init(action: @escaping () -> Void, @ViewBuilder label: @escaping () -> Content) {
//       self.action = action
//       self.label = label
//   }
//
//   init(action: @escaping () -> Void, title: String) where Content == Text {
//
//       self.init(action: action, label: { Text(title) })
//   }
//var body: some View { label().onTapGesture { action() } }
    
