import React from 'react';
import { Svg, Path, Ellipse, Circle, Defs, Rect, ClipPath } from 'react-native-svg';
import { View } from 'react-native';

const LogoOsoSvg = ({ width = 300, height = 300 }) => (
    <View>
        <Svg width={width} height={height} viewBox="0 0 376 347" fill="none">
            <Ellipse cx="225" cy="166" rx="36" ry="35" fill="white" />
            <Ellipse cx="249" cy="168" rx="36" ry="38" fill="white" />
            <Ellipse cx="235" cy="195" rx="36" ry="35" fill="white" />
            <Ellipse cx="230.5" cy="235.5" rx="36.5" ry="75.5" fill="white" />

            <Circle cx="271" cy="136" r="10" fill="white" />
            <Ellipse cx="195" cy="260" rx="36" ry="35" fill="white" />

            <Path d="M213.922 145.391C212.85 144.919 212.028 144.257 211.214 143.413C205.35 137.33 209.696 127.226 217.875 126.408C222.21 125.975 226.14 128.506 228.438 132.049C229.426 133.571 229.586 136.316 231.468 137.054C234.336 138.178 235.442 134.976 234.923 132.79C238.226 132.372 241.341 133.057 244.312 134.584C245.746 135.321 246.98 136.482 248.512 136.99C251.927 132.568 257.628 135.288 261.853 136.496C262.059 134.976 262.626 133.545 263.531 132.297C264.303 131.232 265.381 130.381 266.548 129.781C268.968 128.536 271.946 128.237 274.454 129.43C280.314 132.219 281.671 140.534 276.184 144.402C277.754 141.64 278.087 137.954 275.663 135.534C272.831 132.705 267.578 134.051 266.563 137.978C266.128 139.662 268.366 140.996 269.313 142.179C271.95 145.47 273.288 149.414 275.338 153.05C278.823 159.233 281.051 166.456 281.362 173.557C281.48 176.236 281.087 178.807 280.878 181.463C278.574 179.231 276.664 176.263 274.558 173.804C273.534 172.607 271.913 171.341 271.327 169.851C270.99 168.991 271.242 167.799 271.242 166.886C272.022 166.888 273.663 167.333 274.305 166.869C275.691 165.867 273.725 163.078 272.897 162.386C269.525 159.567 263.255 162.143 264.161 166.886C264.467 168.484 265.771 169.846 266.743 171.086C268.837 173.757 271.839 176.638 273.219 179.733H264.571C262.734 179.733 261.079 179.648 259.656 181.015C255.856 184.666 258.405 190.814 261.607 193.794C262.815 194.919 264.136 195.869 265.807 196.04C264.809 198.975 261.249 200.166 258.395 200.236C252.257 200.389 246.199 196.935 242.829 191.84H242.335C241.525 193.553 240.307 195.149 238.872 196.388C238.038 197.109 236.536 197.801 236.05 198.81C235.331 200.302 235.775 202.143 235.889 203.699C236.295 209.235 238.254 213.735 241.347 218.276C238.678 217.128 236.132 216.509 233.687 214.808C226.194 209.592 221.472 199.978 222.097 190.852C222.338 187.336 223.846 184.502 224.793 181.216C221.013 182.169 218.026 185.785 216.332 189.122C215.69 190.387 215.053 191.651 214.91 193.075H214.416C214.199 190.587 213.289 188.197 213.191 185.663C212.994 180.622 214.972 176.438 217.134 172.074C212.265 172.472 207.948 176.913 205.359 180.722C204.557 181.902 203.793 183.085 203.298 184.428C200.86 176.719 205.101 166.555 211.698 162.191C210.619 161.77 209.306 162.256 208.239 162.604C205.33 163.553 202.866 165.389 200.58 167.38C200.642 164.384 201.459 161.124 202.88 158.485C203.747 156.876 205.114 155.483 205.769 153.791C201.154 153.99 197.551 156.829 194.403 159.968C195.646 155.59 197.951 151.925 201.568 149.097C200.91 146.858 199.4 144.991 198.851 142.673C196.573 143.735 194.678 146.428 193.12 148.355C188.765 153.741 185.325 159.879 182.984 166.392C181.216 171.312 180.205 176.498 179.848 181.71C179.6 185.342 180.034 189.022 180.701 192.581C184.734 214.107 200.988 229.808 218.863 241.019C222.815 243.498 226.868 245.82 230.97 248.038C232.89 249.077 234.815 250.477 236.899 251.137C235.842 243.976 229.382 239.173 224.052 235.106C218.288 230.708 213.249 226.061 210.957 219.018C215.078 221.886 218.488 225.771 222.322 229.002C226.057 232.148 230.202 234.848 233.665 238.311C238.092 242.738 240.725 248.405 241.388 254.596C241.821 258.645 241.675 262.762 240.567 266.702C240.194 268.03 239.654 270.183 238.131 270.577C237.144 270.832 235.936 270.655 234.923 270.655C233.621 270.655 232.257 270.768 230.97 270.541C227.447 269.918 224.418 267.977 221.334 266.284C212.843 261.62 204.603 256.394 195.886 252.152C193.701 251.088 191.525 250.057 189.215 249.287C187.695 248.781 185.937 248.637 184.524 247.856C183.169 247.107 182.624 245.51 183.639 244.233C184.721 242.873 186.494 243.169 187.98 243.544C191.323 244.389 194.525 245.582 197.615 247.123C205.318 250.964 212.781 255.265 220.346 259.366C225.527 262.175 230.928 265.387 236.652 266.949C237.013 264.269 237.641 261.771 237.641 259.043C237.641 258.181 237.858 256.948 237.492 256.146C237.13 255.355 235.893 255.017 235.17 254.657C233.174 253.661 231.224 252.586 229.24 251.57C222.319 248.027 215.516 243.807 209.228 239.24C195.971 229.612 184.261 216.752 179.003 200.981C177.368 196.078 176.121 190.859 176.12 185.663C173.226 186.064 171.564 190.058 170.115 192.334C165.5 199.583 161.969 207.53 158.968 215.559C157.145 220.432 155.803 225.391 154.378 230.383C153.248 234.343 152.551 238.436 151.845 242.489C151.275 245.764 150.893 249.059 150.65 252.372C149.5 268.067 150.537 286.991 164.261 297.364C166.301 298.906 168.564 300.007 170.932 300.946C173.915 302.129 177.126 302.769 180.32 303.021C181.419 310.46 190.966 309.725 196.627 310.661C213.79 313.498 231.052 315.871 248.265 318.407C252.633 319.05 256.991 319.74 261.359 320.384C264.399 320.831 267.408 321.496 270.501 321.283C272.681 321.132 274.816 320.466 276.925 319.939C280.139 319.136 283.356 318.381 286.561 317.533C293.524 315.691 300.571 314.124 307.562 312.379C311.418 311.416 315.29 310.339 319.174 309.516C322.649 308.779 326.474 308.203 329.014 305.482C331.148 303.197 331.658 300.47 332.453 297.586C333.602 293.416 334.523 289.183 335.573 284.985C338.491 273.31 341.32 261.609 344.099 249.901C345.386 244.482 347.484 238.9 348.039 233.348C348.436 229.375 346.677 224.875 342.151 224.5C340.392 224.353 338.459 224.896 336.716 225.125C333.417 225.558 330.117 225.958 326.833 226.49C318.958 227.768 311.005 228.615 303.114 229.783C300.579 230.158 298.003 230.576 295.455 230.835C292.939 231.091 290.099 231.206 287.796 232.357C281.088 235.712 280.24 244.882 278.74 251.384C275.429 265.739 271.94 280.056 268.467 294.374C267.629 297.832 266.825 301.297 265.962 304.751C265.118 308.125 264.169 311.385 264.818 314.881C247.403 312.668 230.058 309.631 212.687 307.116C207.418 306.353 202.126 305.599 196.874 304.731C193.865 304.234 190.764 303.516 187.732 303.268C191.129 301.987 195.039 301.651 198.604 301.024C203.545 300.155 208.624 298.991 213.675 299.337C218.768 299.687 223.551 301.755 228.746 301.529C231.511 301.409 234.324 301.121 236.899 300.054C238.517 299.384 240.616 298.159 242.266 299.495C243.18 300.236 243.125 301.709 243.323 302.774C240.554 302.894 237.929 304.037 235.17 304.257C237.123 305.599 240.766 305.286 243.076 305.563C245.865 305.897 248.63 307.213 251.477 306.932C253.327 306.75 254.703 305.5 256.418 305.21C257.373 305.049 258.398 305.529 259.383 305.469C262.136 305.3 264.492 303.466 265.713 301.045C268.135 296.245 267.593 289.939 265.246 285.232C264.123 282.981 262.487 281.135 261.112 279.056C262.619 278.937 264.083 278.624 265.56 278.315C266.136 278.195 266.89 278.149 267.304 277.675C268.316 276.518 268.432 273.624 268.771 272.138C266.52 272.442 265.162 274.189 263.089 274.684C261.92 274.964 260.741 274.005 260.488 272.879C259.793 269.784 265.031 267.606 267.289 266.987C268.044 266.78 269.214 266.731 269.827 266.211C270.809 265.378 270.953 262.723 271.271 261.514C273.208 254.136 274.639 246.62 276.716 239.277C277.073 238.016 277.651 236.832 278.488 235.819C279.099 235.08 280.25 234.366 280.304 233.326C280.362 232.218 279.799 230.94 279.5 229.889C278.765 227.314 277.921 224.733 276.972 222.229C276.527 221.055 275.649 219.552 275.686 218.276C275.725 216.978 276.632 215.592 276.951 214.323C277.686 211.397 277.876 208.376 277.172 205.429C280.742 204.046 283.25 199.435 283.772 195.793C284.004 194.178 283.662 192.39 283.969 190.852C284.24 189.488 285.126 188.218 285.571 186.898C286.495 184.163 287.082 181.132 287.28 178.251C287.737 171.566 286.589 164.737 284.232 158.485C283.064 155.389 281.047 152.505 280.137 149.344C282.393 148.269 283.951 145.197 284.746 142.92C287.316 135.56 284.072 126.384 276.431 123.573C271.842 121.886 266.159 122.293 262.101 125.141C260.986 125.924 259.927 126.823 259.034 127.852C258.531 128.433 257.969 129.412 257.137 129.528C255.794 129.716 254.101 128.709 252.712 128.612C251.349 128.516 249.872 128.5 248.512 128.632C247.699 128.71 246.862 128.988 246.041 128.856C244.688 128.638 243.443 127.738 242.088 127.413C238.872 126.64 235.692 126.751 232.452 127.354C230.671 123.361 225.426 120.954 221.334 120.37C210.843 118.871 200.795 127.576 202.133 138.473C202.718 143.235 205.006 147.586 208.98 150.385C209.978 151.088 212.291 152.665 213.581 152.149C214.345 151.844 214.737 150.741 215.123 150.085C215.998 148.597 217.009 147.169 218.164 145.885C219.56 144.333 221.108 142.895 222.816 141.693C223.619 141.129 225.206 140.535 225.632 139.612C226.087 138.627 225.48 137.15 225.064 136.249C223.113 132.014 217.003 130.854 213.721 134.295C210.727 137.435 211.319 142.243 213.922 145.391ZM249.253 147.614C250.869 149.6 253.155 151 254.77 153.05C256.274 154.958 256.966 157.338 258.395 159.227C259.143 157.625 259.622 155.926 260.272 154.285C260.568 153.54 261.083 152.643 260.959 151.814C260.787 150.657 259.516 149.688 258.642 149.038C255.987 147.062 252.336 145.998 249.253 147.614ZM240.358 166.886C239.758 168.36 239.196 170.037 239.977 171.579C241.773 175.123 246.53 173.431 247.987 170.592C249.142 168.339 249.413 165.898 247.985 163.675C245.816 160.299 240.151 160.03 237.475 162.959C236.802 163.695 235.244 166.261 236.731 166.984C237.686 167.448 239.316 166.894 240.358 166.886Z" fill="#179659" />
            <Path d="M193.909 172.815C186.183 182.584 189.237 197.84 194.707 207.899C196.342 210.905 198.318 213.765 200.622 216.3C201.533 217.301 202.802 218.65 204.283 217.947C208.102 216.133 203.607 211.748 202.316 209.876C197.582 203.008 194.014 195.073 193.437 186.651C193.206 183.277 193.508 179.881 193.672 176.522C193.73 175.329 194.262 173.962 193.909 172.815ZM265.807 182.571C265.159 182.712 262.933 184.146 264.404 184.751C265.098 185.036 266.292 184.679 267.042 184.675C268.935 184.666 270.831 184.653 272.725 184.676C273.356 184.683 274.272 184.951 274.869 184.731C276.379 184.176 274.382 182.809 273.713 182.655C271.49 182.14 268.04 182.082 265.807 182.571ZM278.16 190.357C276.266 193.634 272.917 195.779 269.266 196.534C270.379 199.528 273.745 201.514 276.405 198.958C278.41 197.031 279.266 192.92 278.16 190.357ZM206.51 190.605C203.36 197.72 206.198 206.018 210.682 211.853C211.962 213.518 213.387 215.412 215.157 216.583C216.122 217.221 217.357 217.483 218.313 216.667C220.09 215.149 218.562 212.873 217.372 211.605C213.621 207.611 210.526 202.912 208.591 197.77C207.729 195.478 207.561 192.787 206.51 190.605ZM246.041 201.476C249.446 207.373 257.366 209.758 263.83 208.701C266.38 208.285 269.804 207.188 270.995 204.688C270.045 204.292 269.134 203.837 268.277 203.262C267.759 202.914 267.218 202.388 266.548 202.42C265.558 202.468 264.475 203.464 263.583 203.869C261.909 204.629 259.986 205.091 258.148 205.172C253.681 205.368 249.801 203.739 246.041 201.476ZM271.489 212.1C270.454 213.575 269.141 214.845 268.069 216.3C265.315 220.038 262.85 223.793 259.62 227.171C254.314 232.72 248.097 237.812 245.316 245.207C243.979 248.763 243.617 252.594 244.21 256.325C244.468 257.945 244.953 259.843 246.539 260.66C249.059 261.958 251.201 259.266 252.959 257.857C257.024 254.599 261 251.193 265.313 248.257C266.443 247.487 267.573 246.684 268.772 246.025C269.829 245.444 271.133 245.008 271.834 243.961C272.97 242.265 271.495 239.964 269.513 240.122C267.103 240.315 264.536 242.511 262.595 243.807C260.558 245.167 258.623 246.671 256.665 248.14C253.624 250.423 250.884 253.169 247.771 255.337C247.765 253.176 247.492 251.302 248.056 249.16C250.573 239.605 259.323 233.899 265.373 226.677C267.934 223.62 270.435 220.272 271.325 216.3C271.617 214.996 272.021 213.368 271.489 212.1ZM225.045 220.446C223.28 221.058 223.697 223.32 224.631 224.443C226.998 227.29 230.461 229.377 233.193 231.865C234.217 232.798 235.606 234.242 237.143 233.657C239.064 232.928 238.725 230.886 237.614 229.642C235.064 226.785 231.728 224.498 228.746 222.119C227.769 221.339 226.444 219.961 225.045 220.446ZM256.418 220.404C252.816 221.351 248.847 225.032 246.667 227.912C245.492 229.465 245.652 232.448 248.265 232.052C249.617 231.847 250.263 230.595 251.063 229.642C252.649 227.75 254.415 225.942 256.171 224.207C256.924 223.463 258.405 222.573 258.669 221.49C258.988 220.174 257.226 220.192 256.418 220.404ZM184.273 229.038C182.244 229.29 180.844 231.671 182.6 233.241C183.492 234.038 184.903 234.007 186.003 234.317C187.545 234.753 189.07 235.635 190.157 236.817C191.591 238.375 192.208 242.081 194.897 241.71C197.958 241.289 196.227 237.124 195.276 235.571C193.576 232.796 190.98 230.945 187.979 229.793C186.859 229.363 185.492 228.888 184.273 229.038ZM339.928 230.489C327.075 232.262 314.219 234.062 301.385 235.961C297.136 236.59 290.441 236.052 288.013 240.266C286.74 242.475 286.429 245.228 285.848 247.678C284.813 252.042 283.722 256.394 282.75 260.772C280.018 273.072 277.043 285.362 273.991 297.586C272.846 302.172 271.554 306.787 270.628 311.422C270.3 313.066 270.967 315.174 272.972 315.074C275.014 314.972 276.681 313.19 277.449 311.422C279.172 307.455 279.576 302.745 280.669 298.574C283.759 286.786 286.463 274.866 289.22 262.996C290.14 259.037 291.042 255.081 292.028 251.137C292.506 249.224 292.76 246.952 293.705 245.207C294.872 243.053 296.948 242.748 299.161 242.422C301.467 242.082 303.777 241.753 306.079 241.396C313.653 240.221 321.227 239.023 328.81 237.9C332.887 237.297 337.16 236.992 341.163 235.99C343.092 235.508 344.218 232.82 342.766 231.221C342.032 230.414 340.935 230.35 339.928 230.489ZM190.45 256.819C185.853 252.515 177.236 253.269 171.92 255.553C170.149 256.313 168.015 257.233 166.81 258.8C166.024 259.821 165.984 261.514 167.015 262.395C168.864 263.975 171.709 261.133 173.402 260.355C178.717 257.913 184.62 256.819 190.45 256.819ZM203.545 263.243C202.217 261.079 198.392 261.016 196.133 261.02C188.95 261.031 181.953 264.831 176.865 269.689C176.384 270.148 175.956 270.648 175.521 271.149C174.164 272.714 170.563 276.142 173.429 278.131C174.4 278.805 175.523 278.477 176.358 277.764C178.044 276.321 179.366 274.448 181.062 272.984C185.854 268.844 191.259 266.088 197.368 264.441C199.377 263.899 201.453 263.286 203.545 263.243ZM320.409 265.714C320.1 265.299 319.842 264.945 319.406 264.646C317.26 263.173 315.573 264.849 313.491 265.287C312.568 265.481 311.695 264.998 310.773 265.021C309.6 265.05 308.446 265.805 307.605 266.571C304.616 269.287 303.914 274.1 305.098 277.82C305.505 279.101 306.161 280.764 307.34 281.523C308.802 282.464 310.109 281.136 311.515 280.768C312.677 280.464 313.829 280.988 314.974 280.706C316.569 280.314 317.672 278.434 318.369 277.079C318.704 276.427 319.219 275.619 319.151 274.855C319.406 273.5 321.101 271.387 321 270C320.848 267.917 321 267 320.409 265.714ZM186.003 297.339C187.525 296.964 190.614 297.056 191.75 295.921C192.667 295.005 192.843 292.632 193.25 291.409C194.318 288.207 195.642 285.169 197.372 282.268C201.078 276.05 206.453 271.502 212.934 268.432C208.648 265.586 203.668 268.153 200.086 270.877C194.371 275.223 190.494 281.8 188.058 288.444C187.033 291.241 186.028 294.338 186.003 297.339ZM198.604 294.868C203.348 293.641 209.02 292.714 213.922 293.181C219.099 293.674 223.999 295.36 229.24 295.362C230.285 295.363 231.432 295.487 232.452 295.225C233.685 294.907 234.756 294.064 235.911 293.55C237.767 292.725 239.823 292.428 241.841 292.719C246.226 293.351 248.823 296.787 249.006 301.045C249.85 301.045 250.913 301.209 251.713 300.896C253.054 300.371 253.417 298.612 253.449 297.339C253.545 293.627 251.472 291.445 250.241 288.197C254.926 287.866 258.593 291.135 259.093 295.856C259.246 297.301 258.758 298.636 258.642 300.057C260.919 299.412 261.555 296.478 261.603 294.374C261.726 288.997 258.301 284.23 254.194 281.091C247.1 275.667 238.511 277.185 230.229 276.822C227.3 276.694 224.324 276.137 221.581 275.086C220.15 274.539 218.429 273.056 216.887 273.028C214.809 272.991 212.037 275.248 210.463 276.431C204.831 280.661 199.571 287.69 198.604 294.868Z" fill="white" />
            <Ellipse cx="219.5" cy="136" rx="11.5" ry="10" fill="white" />
            {/* Aquí incluirías las demás rutas y elementos del SVG */}
        </Svg>
        <Defs>
            <ClipPath id="clip0_302_324">
                <Rect width="271" height="272" fill="white" />
            </ClipPath>
        </Defs>
    </View>
);

export default LogoOsoSvg;
