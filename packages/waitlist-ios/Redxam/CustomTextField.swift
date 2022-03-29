//
//  CustomTextField.swift
//  Redxam
//
//  Created by Priyanka Dadhich on 3/8/22.
//

import SwiftUI

struct CustomTextField: View {
    @State var text: String = ""
    @State var placeholder_text = ""
    
    var body: some View {
        TextField(placeholder_text, text: $text)
            .font(Font.custom( "Rubik-Regular", size: 18))
            .padding(10)
            .background(RoundedRectangle(cornerRadius: 20).fill(Color(red: 255/255, green: 255/255, blue: 255/255))) // Here!!
            .foregroundColor(.black)
            
            
    }
}

struct CustomTextField_Previews: PreviewProvider {
    static var previews: some View {
        CustomTextField()
    }
}
