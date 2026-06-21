window.PROJECT_CONTENT = {
 "phantom": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Phantom | An Bio-inspired Interactive Prototype"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Final Project for Design & Making Across Disciplines Studio | Cornell Tech & Cornell AAP College"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[DATE] Sept - Dec 2022"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[INSTRUCTOR] Jenny Sabin (Architecture)"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Participating Instructors] Jonathan Butcher (Biomedical Engineering), Nate Cira (Biomedical Engineering), Wendy Ju (Information Science), Marty Murtagh (Materials Science & Engineering), Uli Wiesner (Materials Science & Engineering)"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Teaching Associate] Nick Cassab"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Design Team] Chenming He, Ziqi Wang, Minyu Huang"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[My Role] Concept Design, Algorithm Research, Digital Tool Development, 3D printing, Digital Modeling, Physical Models, Video Making"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Abstract] Inspired by the Differential Growth phenomenon in nature and its underlying morphogenesis mechanism, this project aims to introduce a new interactive prototype achieved by the combination of generative design, customized 3D printing on elastic fabrics, and the Arduino System. This prototype can be further developed to be implied in designing an interactive installation, dynamic architecture facades, wearable electric clothing, soft robots, and other fields."
  },
  {
   "t": "text",
   "g": "p",
   "x": "During this exploration process, we built up the algorithm to mimic differential growth process and created our own digital tool to generate complex printable geometry. Then we leveraged customized 3D printing on the elastic fabric to enable the fabric to have a differential deformation ratio in different parts, which allow the fabric to deform naturally like leaves in nature. Next, the mechanical system and our delicately designed interactive light system are added to the system to facilitate to complete the basic interactive prototype, in which the form of fabrics and lighting effects on them can change according to human behaviors or other external stimulus responsively. Lastly, based on this prototype, we tried to design a large-scale interactive installation named Phantom over an urban public plaza as an example to showcase how this prototype can contribute to an installation design to make the urban environment more lively and increase public engagement."
  },
  {
   "t": "text",
   "g": "h3",
   "x": "Stage 1. Differential Growth Algorithm Exploration"
  },
  {
   "t": "text",
   "g": "p",
   "x": "In recent years, designers and scholars have been trying to get some inspiration from the biology field and then apply it to the design field to get more possibilities and varieties. Among those attempts, Differential Growth, a common natural phenomenon, just as its literal meaning, refers that living creatures have different growth ratios in different parts, has drawn a lot of attention. Since lots of complex behaviors, like phototaxis, or patterns, such as the unique texture of Brian Corals, can all be explained or described as the result of Differential Growth, lots of precedent researchers have devoted to decoding this phenomenon into the digital algorithm and then tried to use it to reproduce the natural complexity."
  },
  {
   "t": "text",
   "g": "p",
   "x": "After reading lots of related scientific papers in biology and morphogenesis field, I learned that every single complex natural pattern or behavior is caused by cells’ uneven proliferation and movement. So that if we can simulate cells’ non-uniform distribution and growth, then we can probably reproduce the complex macroscopic phenomenon. Based on this thought and also inspired by lots of previous practice experience of digitalizing Differential Growth phenomenon from other computational designers, I finally figured out that Differential Growth could be simplified and decoded into an algorithm based on a physical collision model consisting of several collision spheres with a certain proliferation rule. To be more specific, we only need to apply three simple rules to mimic the natural phenomenon:"
  },
  {
   "t": "img",
   "f": "02.jpg"
  },
  {
   "t": "img",
   "f": "03.jpg"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Picture1 Brain Coral source link"
  },
  {
   "t": "img",
   "f": "04.png"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Picture2 Brain Coral source link"
  },
  {
   "t": "text",
   "g": "p",
   "x": "And all the force vectors used in the above rules obey Hooke’s Law, which means their magnitude is proportional to the difference between their distance and the sum of radiuses (F = k*(Distance - RadiuesSum)). So those points can be regarded as a group of bouncing balls connected by springs. Then after implementing these rules to points iteratively, a typical differential growth pattern will be generated. And this generative algorithm is very robust and it ensures the pattern to fill in any 2D boundarys:"
  },
  {
   "t": "img",
   "f": "05.gif"
  },
  {
   "t": "img",
   "f": "06.gif"
  },
  {
   "t": "img",
   "f": "07.gif"
  },
  {
   "t": "text",
   "g": "p",
   "x": "This pattern can also wrap complex 3D surface perfectly and the algorithm can be extended to simulate mesh growth:"
  },
  {
   "t": "img",
   "f": "08.gif"
  },
  {
   "t": "img",
   "f": "09.jpg"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Here are some laser cuttings and 3D printing results of the geometry generated by this algorithm as a conclusion of the algorithm exploration stage:"
  },
  {
   "t": "img",
   "f": "10.jpg"
  },
  {
   "t": "img",
   "f": "11.jpg"
  },
  {
   "t": "img",
   "f": "12.jpg"
  },
  {
   "t": "img",
   "f": "13.jpg"
  },
  {
   "t": "img",
   "f": "14.jpg"
  },
  {
   "t": "text",
   "g": "h3",
   "x": "Stage 2. Morphogenesis Mechanism Research"
  },
  {
   "t": "text",
   "g": "p",
   "x": "After delving into the morphogenesis aspect, we got a deeper understanding of the underlying mechanism of the formation of natural leaves’ curly shapes. From Changjin Huang et al.’s research, we learned that the boundary area of the leave usually grows faster than the middle area, which can be proved by cutting the leaves into slices and comparing their length just as shown in the diagram, this differential growth behavior is actually the key factor for curly shapes. And furthermore, different plants usually have varied growth speed ratios between the edge and middle area which leads to the different types of twisted or curly shapes of their leaves. Inspired by this mechanism, we tried to do some analog experiments to reproduce the natural curly shape. Specifically, we cut some paper strips with sequential lengths and then tried to stick them together with glue. As a result, we got similar curly-leave shapes successfully as shown below:"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Apparently, even though the first analog test reproduced the similar natural curly shape, it's still static and not dynamic. And then the second study model was able to change its shape by manually pushing or pulling those strips, but its dynamic feature is still not enough. So we’re trying to find more possibilities from other materials."
  },
  {
   "t": "img",
   "f": "15.png"
  },
  {
   "t": "img",
   "f": "16.png"
  },
  {
   "t": "img",
   "f": "17.png"
  },
  {
   "t": "img",
   "f": "18.png"
  },
  {
   "t": "img",
   "f": "19.png"
  },
  {
   "t": "img",
   "f": "20.png"
  },
  {
   "t": "text",
   "g": "h3",
   "x": "Stage 3. Digital Fabrication Process & Final Interactive Prototype"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "1.Customized 3D printing on pre-extended elastic fabric"
  },
  {
   "t": "text",
   "g": "p",
   "x": "With the understanding of the morphogenesis mechanism, we know that if the edge is longer than the middle area, then the sheet will deform a natural curly shape. To make sure the boundary section is longer than the middle section, we first stretched the elastic fabric and fix it on the printing plate and then printed PLA only on the boundary area to maintain the prolonged length. We leveraged customized G-code to print the unique 2D differential growth pattern generated by our algorithm mentioned above. Here are three reasons to use the pattern as the toolpath. Firstly, since the pattern is based on a physical sphere-collision model, the pattern is distributed evenly so that the internal extension force is also distributed evenly. Secondly, the pattern is an efficient space-filling pattern, so using it as the toolpath can decrease total path length which leads to a shorter printing time. Lastly, the differential growth pattern is continuous and contains no hard corners, which is beneficial for good printing quality. After printing PLA on the fabric, the fabric has different stiffness in different areas, so that when it’s subjected to external force in the middle area, it will deform like a natural leaf."
  },
  {
   "t": "img",
   "f": "21.jpg"
  },
  {
   "t": "img",
   "f": "22.jpg"
  },
  {
   "t": "img",
   "f": "23.gif"
  },
  {
   "t": "img",
   "f": "24.jpg"
  },
  {
   "t": "img",
   "f": "25.png"
  },
  {
   "t": "img",
   "f": "26.png"
  },
  {
   "t": "img",
   "f": "27.gif"
  },
  {
   "t": "text",
   "g": "p",
   "x": "We still explored other variations:"
  },
  {
   "t": "img",
   "f": "28.gif"
  },
  {
   "t": "img",
   "f": "29.gif"
  },
  {
   "t": "text",
   "g": "p",
   "x": "The whole control system consists of two parts. The first part is an Arduino system that contains a gesture recognition sensor and several 64kg servo motors. The sensor can detect the movement when people weave their hands over it in four directions, up, down, left, and right. After receiving the signals from the sensor, the Arduino board can send commands to the servo motors to do responsive behaviors. And the second part is a cable system that is based on an acrylic framework and is in charge of suspending the fabrics and stretching or loosening the fabrics under the control of servo motors. After finishing the controlling system, we tried building a small prototype (50x50x80cm) and also a larger one (1x1x4m) attached on the ceiling of our studio classroom to test its robustness."
  },
  {
   "t": "text",
   "g": "h4",
   "x": "2.Controlling system"
  },
  {
   "t": "img",
   "f": "30.png"
  },
  {
   "t": "img",
   "f": "31.gif"
  },
  {
   "t": "img",
   "f": "32.png"
  },
  {
   "t": "img",
   "f": "33.png"
  },
  {
   "t": "img",
   "f": "34.png"
  },
  {
   "t": "img",
   "f": "35.jpg"
  },
  {
   "t": "text",
   "g": "p",
   "x": "To make the prototype more interactive and also to get fancier visual effects, we also built an interactive lighting system based on TouchDesig. In this system, the lighting effect can change its shapes and color according to users’ body gestures. About the general logic of the whole system, firstly we used a Kinect camera to capture the body gestures of users and then passed the data to the Touch Design software in the computer, then after a real-time processed visual effect is generated, lastly we project the video onto our prototype by using a projector. Moreover, the input of the lighting system can be other things such as human facial emotions, weather, and so on."
  },
  {
   "t": "text",
   "g": "h4",
   "x": "3.Interactive Lighting System"
  },
  {
   "t": "img",
   "f": "36.gif"
  },
  {
   "t": "img",
   "f": "37.gif"
  },
  {
   "t": "text",
   "g": "p",
   "x": "After combining all the systems above, we achieved our basic interactive prototype, which can automatically change its form and lighting effect on itself according to external stimuli. When people weave their hands in front of the gesture sensor, servo motors will pull the fish string, which will deform elastic fabrics. Since the boundary region of the fabric has already been enforced by 3D printed PLA, the fabrics will form a curly leaf-like shape finally which aligns with the morphogenesis mechanism of Differential Growth. In addition, the interactive lighting system can also change itself responsibly to highlight the curvature difference. Finally, when people weave their hands again, fabrics will recover flat again."
  },
  {
   "t": "text",
   "g": "h4",
   "x": "4.Final Interactive Prototype"
  },
  {
   "t": "img",
   "f": "38.jpg"
  },
  {
   "t": "img",
   "f": "39.gif"
  },
  {
   "t": "text",
   "g": "h3",
   "x": "Stage 4. Public Interactive Installation Design"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Based on this basic interactive prototype, we want to leverage its interactive ability to develop a design concept for a public installation over Flatiron Plaza in New York City to activate the vitality of the urban environment. We want to install some anchors on surrounding buildings around the plaza and connect steel strings to those anchors to hang up two giant pieces of fabric over the Flatiron Plaza. Those two pieces of fabric are stiffened on the boundary region by using large-scale 3D printing so that we can use motors to tighten strings to make them form curly shapes over the air."
  },
  {
   "t": "img",
   "f": "40.jpg"
  },
  {
   "t": "img",
   "f": "41.jpg"
  },
  {
   "t": "img",
   "f": "42.jpg"
  },
  {
   "t": "text",
   "g": "p",
   "x": "We also built a 1:100 scale physical model to predict its visual effect and influence on the neighboring urban environment, and this also concludes this whole project…"
  },
  {
   "t": "img",
   "f": "43.jpg"
  },
  {
   "t": "img",
   "f": "44.gif"
  },
  {
   "t": "img",
   "f": "45.gif"
  },
  {
   "t": "img",
   "f": "46.jpg"
  },
  {
   "t": "img",
   "f": "47.jpg"
  }
 ],
 "growfilltopowood": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "h2",
   "x": "How might emergent space-filling computational methodologies generate adaptive architecture in Chinese rural area"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Master’s Thesis for M.S Matter Design Computation program"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[DATE] Jan 2023 - May 2024"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[INSTRUCTOR] Prof. Jenny Sabin, Prof. Leslie Lok"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Project Type] Individual project"
  },
  {
   "t": "text",
   "g": "p",
   "x": "P.S. The GrowFill algorithm has been published in a paper; refer to the publications section for more details."
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Abstract] This thesis explores computational design strategies to revitalize adaptive vernacular architecture in rural China, addressing cultural erosion from modern construction. It introduces GrowFill and TopoWood, two bespoke algorithms optimizing structures with local materials—earth and wood—through a multi-material, performance-driven system."
  },
  {
   "t": "text",
   "g": "p",
   "x": "GrowFill optimizes 3D-printed earth walls, enhancing structural integrity while minimizing material waste. TopoWood refines traditional timber frameworks, aligning wood placement with stress lines for efficiency and greater spanning capabilities. Both leverage topology optimization, validated through PLA and clay printing prototypes."
  },
  {
   "t": "text",
   "g": "p",
   "x": "This approach preserves architectural diversity, reduces environmental impact, and supports local craftsmanship. The thesis acknowledges current algorithmic limitations and suggests future research into 3D optimization and large-scale applications."
  },
  {
   "t": "img",
   "f": "02.jpg"
  },
  {
   "t": "img",
   "f": "03.jpg"
  },
  {
   "t": "img",
   "f": "04.jpg"
  },
  {
   "t": "img",
   "f": "05.jpg"
  },
  {
   "t": "img",
   "f": "06.jpg"
  },
  {
   "t": "img",
   "f": "07.jpg"
  },
  {
   "t": "img",
   "f": "08.jpg"
  }
 ],
 "well-story": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Story of Well | Machine Learning & Urban Spirit"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Machine Learning for Urban Texture &"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Architectural Design of The Museum In Jianshui Ancient City, Yunnan"
  },
  {
   "t": "text",
   "g": "p",
   "x": "When I was designing the museum in the third year of my undergraduate degree, I was moved by the space, people's daily lives and their collective memories in the Jianshui Anceint city. Thus, I tired to reproduce these elements in the design, and one of the most important steps was to refill the urban texture into the site to obtain the same architectural scale and spatial combination relationship. However, the traditional design method did not satisfy me at that time. Therefore, I kept looking for the answer to this question, and finally find the machine learning method to represent the urban spirit."
  },
  {
   "t": "img",
   "f": "02.jpg"
  },
  {
   "t": "img",
   "f": "03.jpg"
  },
  {
   "t": "img",
   "f": "04.jpg"
  },
  {
   "t": "img",
   "f": "05.jpg"
  },
  {
   "t": "img",
   "f": "06.jpg"
  },
  {
   "t": "img",
   "f": "07.jpg"
  },
  {
   "t": "img",
   "f": "08.jpg"
  }
 ],
 "flowing-leaves": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Flowing Leaves | Structure Analysis & Optimization"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Parametric Design of The Gymnasium In Chongqing University, Chongqing"
  },
  {
   "t": "text",
   "g": "p",
   "x": "In the design of large-span buildings, the form of the structure plays a decisive role in the final architectural form. In this project, we compound serveral simple structure paradigms to form a complex structure that can fit the shape of the leaf, and then use parametric methods to analyze the structure force, and continuously optimize and improve the structure to obtain the final result. In the end, the curved shape and the organic topography complement each other and stimulate the vitality of the campus."
  },
  {
   "t": "img",
   "f": "02.jpg"
  },
  {
   "t": "img",
   "f": "03.jpg"
  },
  {
   "t": "img",
   "f": "04.jpg"
  },
  {
   "t": "img",
   "f": "05.jpg"
  },
  {
   "t": "img",
   "f": "06.jpg"
  },
  {
   "t": "img",
   "f": "07.jpg"
  }
 ],
 "digital-mural": [
  {
   "t": "img",
   "f": "01.png"
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Digital Mural | Algorithm & Pattern Generation"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Design & Fabrication of The Interior Wall For The Exhibition In Shanghai"
  },
  {
   "t": "text",
   "g": "p",
   "x": "The handprints in the Lascaux Caves are one of the earliest artistic origins of mankind. These murals reflect the awakening of primitives' self-consciousness, since, through murals, they tried to understand the relationship between humans and nature, life and death, etc. In this project, we want to complete a digital mural to reflect on the current relationship between human, technology and nature.Specifically, the natural texture is generated by the algorithm, and then the final pattern is formed by human artistic processing."
  },
  {
   "t": "img",
   "f": "02.jpg"
  },
  {
   "t": "img",
   "f": "03.jpg"
  },
  {
   "t": "img",
   "f": "04.jpg"
  },
  {
   "t": "img",
   "f": "05.jpg"
  },
  {
   "t": "img",
   "f": "06.jpg"
  }
 ],
 "robotic-arm": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "p",
   "x": "In this project, I firstly assembled the robot arm parts provided by the instructor into a complete robot arm, and then used GH to build its kinematic model to control it. Next, after error analysis and adjustment, I designed and tested the end effector to prepare for the final project. The final project is about a vault fabrication which is formed by the RhinoVault plug-in based on 3D graphic statics. However, due to limited time and low accuracy of servors, I have to use laser cutting rather than the robotic arm to complete the final fabrication. However, in the future I will continue to study how to achieve high-precision robotic arms at low cost, so as to realize the real democratization of robotic arms."
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Robotic Arm Democratization | Digital Tools & Fabrication"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Research on Mechanism of The Robotic Arm & Fabrication Practice"
  },
  {
   "t": "img",
   "f": "02.jpg"
  },
  {
   "t": "img",
   "f": "03.jpg"
  },
  {
   "t": "img",
   "f": "04.jpg"
  },
  {
   "t": "img",
   "f": "05.jpg"
  },
  {
   "t": "img",
   "f": "06.jpg"
  }
 ],
 "polytile4": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "img",
   "f": "02.jpg"
  },
  {
   "t": "img",
   "f": "03.jpg"
  }
 ],
 "forest-grid": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Forest Grid | Modularization & Details"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Architectural Design of The Residential Community In University Town, Chongqing"
  },
  {
   "t": "text",
   "g": "p",
   "x": "The project is located in the newly-built university town in Chongqing and there was no context to follow. Therefore, the modularization method was adopted to guide the mass generation. The surrounding environment is university campuses, thus the users are mostly young people,as for this aspect, we adopted open community strategy to respond to urban relationship. And finally considering the climatic conditions, we added shading components, and in-depth researched and designed the internal details of the architecture."
  },
  {
   "t": "img",
   "f": "02.jpg"
  },
  {
   "t": "img",
   "f": "03.jpg"
  },
  {
   "t": "img",
   "f": "04.jpg"
  },
  {
   "t": "img",
   "f": "05.jpg"
  }
 ],
 "tast-of-love": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Inspired by Salvador Dalí, in this installation, I tried to use different abstract geometries to express how love blinds people’s eyes, how love words make people unable to hear more from others, and how the conflict between pride and jealousy makes people not willing to speak out their deep feeling. But in spite of those harms, in the center of our hearts, we still want to give our true love, all the blessings, and all the beautiful things just like a butterfly to our dear lovers."
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Tast of Love | Art Interactive Installation"
  },
  {
   "t": "text",
   "g": "p",
   "x": "An art interactive installation inpired by Salvador Dalí"
  },
  {
   "t": "img",
   "f": "02.jpg"
  }
 ],
 "orthogonal-branching-system": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Orthogonal Branching System | Algorithm Development"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Final Project for Coding for Design I Course"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[DATE] Sept - Dec 2022"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[INSTRUCTOR] Panagiotis Michalatos"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Project Type] Individual project"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Abstract] In this project, I focused on algorithm development, trying to combine together two classical algorithms – Random Walk and Branching System and then tried to use it to do some designs. I started with simple rules to mimic Random Walk behavior then played with the algorithm and also introduced more new features into it to gain more control, get more possibilities and increase its complexities. Then I added the Branching function, and this additional function converted the whole algorithm into a space-filling algorithm, which generates more interesting results. Next, the algorithm was extended from 2D to 3D, having more practical meaning in the design field. Thus, in the end, I successfully used this algorithm developed by myself to finish a concept design for a public installation."
  },
  {
   "t": "text",
   "g": "h3",
   "x": "Stage 1. Random Walk Algorithm"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "The basic rules to achieve Random Walk:"
  },
  {
   "t": "img",
   "f": "02.png"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "After implementing these basic rules, we can get a unique behavior similar to Brownian Movement:"
  },
  {
   "t": "img",
   "f": "03.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "We can play with these rules to have different variations"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Variation 1 - One Main Direction"
  },
  {
   "t": "img",
   "f": "04.png"
  },
  {
   "t": "img",
   "f": "05.png"
  },
  {
   "t": "img",
   "f": "06.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Variation 2 - Different Step Length"
  },
  {
   "t": "img",
   "f": "04.png"
  },
  {
   "t": "img",
   "f": "07.png"
  },
  {
   "t": "img",
   "f": "08.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Variation 3 - Attractor"
  },
  {
   "t": "img",
   "f": "09.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Variation 4 - No Self-intersection"
  },
  {
   "t": "img",
   "f": "10.gif"
  },
  {
   "t": "text",
   "g": "h3",
   "x": "Stage 2. Branching System Algorithm"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "The basic rules to achieve the branching behavior:"
  },
  {
   "t": "img",
   "f": "11.png"
  },
  {
   "t": "img",
   "f": "12.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "This algorithm can also be extended to 3 dimentional:"
  },
  {
   "t": "img",
   "f": "13.png"
  },
  {
   "t": "img",
   "f": "14.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "We can also add some growth obstacles to get more control"
  },
  {
   "t": "img",
   "f": "15.png"
  },
  {
   "t": "img",
   "f": "16.gif"
  },
  {
   "t": "img",
   "f": "17.jpg"
  },
  {
   "t": "img",
   "f": "18.png"
  },
  {
   "t": "text",
   "g": "h3",
   "x": "Stage 3. Public Installation Design"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Use the algorithm to generate the framework"
  },
  {
   "t": "img",
   "f": "19.jpg"
  },
  {
   "t": "img",
   "f": "20.jpg"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Set different demands for different areas"
  },
  {
   "t": "img",
   "f": "21.png"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Use growth obstacles to influence geometry generation"
  },
  {
   "t": "img",
   "f": "22.jpg"
  },
  {
   "t": "img",
   "f": "23.gif"
  },
  {
   "t": "img",
   "f": "20.jpg"
  },
  {
   "t": "img",
   "f": "24.jpg"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Give the framework volumes"
  },
  {
   "t": "img",
   "f": "25.png"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "According to different demands in different areas, I used different sunshade components to consist the panel system"
  },
  {
   "t": "img",
   "f": "26.png"
  },
  {
   "t": "img",
   "f": "27.png"
  },
  {
   "t": "img",
   "f": "28.png"
  },
  {
   "t": "img",
   "f": "29.png"
  },
  {
   "t": "img",
   "f": "30.png"
  },
  {
   "t": "img",
   "f": "31.png"
  },
  {
   "t": "img",
   "f": "32.jpg"
  },
  {
   "t": "img",
   "f": "33.jpg"
  },
  {
   "t": "img",
   "f": "34.jpg"
  },
  {
   "t": "img",
   "f": "35.jpg"
  }
 ],
 "rebuild-cat-trees": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Rebuild Cat Trees | Interactive Structure Building System"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Final Project for Coding for Design II Course"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[DATE] Jan - May 2023"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[INSTRUCTOR] Panagiotis Michalatos"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Project Type] Individual project"
  },
  {
   "t": "text",
   "g": "p",
   "x": "[Abstract] In this course, we are required to build an interactive generation system in the Unity environment. Inspired by my life experience, building an interactive system to generate customized cat trees became my concept. In the project, Millipede, an external library especially made for force analysis and topology optimization, is adapted in Unity to be in charge of providing real-time feedback for structure evaluations and Unity is responsible for user interface and visualization. After combining those two tools together, I successfully built a prototype system which allows users to build a more structurally rational and more customized cat tree according to their design and preference. But this is just a start, in the future, I hope this system can be developed more to bring more fun to more people and be applied in more fields, even in human-scale designs."
  },
  {
   "t": "text",
   "g": "h3",
   "x": "Target Problem & Concept"
  },
  {
   "t": "text",
   "g": "p",
   "x": "My two cats are both very energetic. It seems that staying at home cannot satisfy their daily demand for exercises, they always want to go outside to play…"
  },
  {
   "t": "img",
   "f": "02.png"
  },
  {
   "t": "text",
   "g": "p",
   "x": "So I tried to buy a cat tree for them to release their energy, but the structure is not stable. Especially when Paopao (the white fat one) jumps onto it, the whole structure shakes a lot, so Paopao feels scared and hardly plays with it. So an idea came out from my mind, how about I use what I learnt to rebuild a more stable and more customized cat tree for them?"
  },
  {
   "t": "img",
   "f": "03.png"
  },
  {
   "t": "img",
   "f": "04.png"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Based on this idea, and also inspired by a game named Poly Bridge, I had an initial concept for this final project, here I drafted this general workflow."
  },
  {
   "t": "text",
   "g": "h3",
   "x": "Tools & The Basic Model"
  },
  {
   "t": "text",
   "g": "p",
   "x": "I learned Unity in the course and also Millipede in my independent study from my instructor Pan. Millipede is a Grasshopper plug-in for force analysis and topology optimization, through which I did lots of basic experiments in the Rhino environment. Here are two simplest examples."
  },
  {
   "t": "img",
   "f": "05.png"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Since this course requires us to build an interactive generative system in Unity environment as our final projects, I planned to use Millipede in Unity to build a system which can let users rebuild their customized cat trees. Thus, with the help from Pan, I used the Millipede library in the Unity environment. The basic framework is that Millipede is in charge of force calculation and Unity is responsible for UI feedback and also real time visualization of the structure. Based on this framework, I started to build the first basic model."
  },
  {
   "t": "img",
   "f": "06.png"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Step 1. Deflection Visualiztion"
  },
  {
   "t": "text",
   "g": "p",
   "x": "I started with the simplest model which only contains one load node and one anchor node, and they are connected with a beam element. Then Millipede will calculate the force analysis and also get the maximum deflection values for all the nodes. The next step is to use Unity to display the movement of all the nodes according to their maximum deflection values."
  },
  {
   "t": "img",
   "f": "07.gif"
  },
  {
   "t": "img",
   "f": "08.png"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Step 2. Subdivision and Add A Beam"
  },
  {
   "t": "text",
   "g": "p",
   "x": "I want to let create some subdivision nodes on beams so that users can connect two nodes among them to create more beams to customize or stabilize the structure according to their preference"
  },
  {
   "t": "img",
   "f": "09.gif"
  },
  {
   "t": "img",
   "f": "10.png"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Step 3. Add A Beam Function"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Each time when the user add a beam, the millipede will redo the force calculation again to update the result for each node, so that people can get some feedbacks to guide them to improve structure stability"
  },
  {
   "t": "img",
   "f": "11.gif"
  },
  {
   "t": "img",
   "f": "12.png"
  },
  {
   "t": "text",
   "g": "h3",
   "x": "The Final Model"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "User Interface"
  },
  {
   "t": "img",
   "f": "13.png"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Initial Default Setting — Input some initial components, then the closest beams will be generated automatically"
  },
  {
   "t": "img",
   "f": "14.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Feature 1. Add More Beams"
  },
  {
   "t": "img",
   "f": "15.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Feature 2. Add More Base Components"
  },
  {
   "t": "text",
   "g": "p",
   "x": "By choosing the base icon, we can create new base component on the ground for further development"
  },
  {
   "t": "img",
   "f": "16.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Feature 3. Add More House Components"
  },
  {
   "t": "text",
   "g": "p",
   "x": "By choosing the house icon, we can create new house components. And there will be a new beam generated automatically between the new house component and its nearest base component."
  },
  {
   "t": "img",
   "f": "17.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Feature 4. Replace or Add More Other Components"
  },
  {
   "t": "text",
   "g": "p",
   "x": "By selecting different icons, we can add different components to create more customized cat tree according to our own design."
  },
  {
   "t": "img",
   "f": "18.gif"
  },
  {
   "t": "text",
   "g": "p",
   "x": "All those features are achieved by the similar mechanism. In the algorithm, it has serval modes, each model has its own function block."
  },
  {
   "t": "img",
   "f": "19.png"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Evaluation Feature 1. Real-time Deflection Value Display"
  },
  {
   "t": "text",
   "g": "p",
   "x": "The last and current deflection values are displayed on the upper left corner. If the value gets red, it means the current value is larger than the last one, which might not be good. When it gets green, that means the deflection is getting smaller. So that the users can judge if each of their moves is good or bad."
  },
  {
   "t": "img",
   "f": "20.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Evaluation Feature 2. Beam Color"
  },
  {
   "t": "text",
   "g": "p",
   "x": "I first divided the beam's maximum stress value by its material yield stress to get a value. When this value is larger than 0.5, the beam will become red, which indicates this beam is approaching its limit and needs more structure support."
  },
  {
   "t": "img",
   "f": "21.png"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Evaluation Feature 3. Crazy Cat Mode"
  },
  {
   "t": "text",
   "g": "p",
   "x": "After finish all the operations, users can check the cat icon to start the Crazy Cat Mode. In this mode, a cat geometry will be placed randomly on platform and other components and also it will apply a temporary load to this node to test the structure strength of the whole cat tree. This mode tries to simulate the real situation and aims to help user to find more structure flaws."
  },
  {
   "t": "img",
   "f": "22.gif"
  },
  {
   "t": "text",
   "g": "h4",
   "x": "Afterwords"
  },
  {
   "t": "text",
   "g": "p",
   "x": "This project ended here as the course ended, but I really hope in the future I can use what I learned to build a more stable, more rational, and more customized cat tree for my cats. And also I think this project has its potential to help non-professional people to build their cat trees too, and also it can be extended to design human-scale installations and so on. Hopefully, in the future, it can be further developed to bring more fun."
  },
  {
   "t": "img",
   "f": "23.jpg"
  }
 ],
 "airport-departure-gate": [
  {
   "t": "img",
   "f": "01.jpg"
  },
  {
   "t": "text",
   "g": "h2",
   "x": "Hongqiao Airport Departure Zone Renovation | Fabrication Practice"
  },
  {
   "t": "text",
   "g": "p",
   "x": "Design & Fabrication of Departure Gates In Shanghai Hongqiao Airport"
  },
  {
   "t": "text",
   "g": "p",
   "x": "During my internship, I participated in the design and the fabrication of new depaeture gates in Shanghai Hongqiao International Airport."
  },
  {
   "t": "img",
   "f": "02.jpg"
  }
 ]
};
